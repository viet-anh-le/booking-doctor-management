const Chat = require("../../models/chat.model");
const Account = require("../../models/account.model");
const RoomChat = require("../../models/roomChat.model");
const DoctorAccount = require("../../models/doctor.model");

const { uploadBuffersToCloudinary } = require("../../helpers/uploadBuffer");

//connect
module.exports.index = async (req, res) => {
  //SocketIO
  _io.on("connection", (socket) => { ///Handle khi có connect từ client tới
    console.log("New client connected" + socket.id);

    socket.on("sendDataClient", async function (data) {
      const urls = await uploadBuffersToCloudinary(data.images);
      const record = new Chat({
        user_id: data.user_id,
        content: data.content,
        images: urls,
        room_id: data.room_id
      });
      await record.save();

      _io.emit("sendDataServer", {
        user_id: data.user_id,
        content: data.content,
        images: urls
      });
    })

    socket.on("getFriendList", async ({ user_id, role }) => {
      try {
        let user, friendList;
        if (role === "doctor") {
          user = await DoctorAccount.findById(user_id);
        } else {
          user = await Account.findById(user_id);
        }

        if (!user || !user.friendList) return;

        // Lấy danh sách user_id từ friendList
        const friendIds = user.friendList.map(f => f.user_id);

        // Truy vấn thông tin bạn bè
        let friendInfos;
        if (role == "doctor"){
          friendInfos = await Account.find({ _id: { $in: friendIds } }).select("fullName avatar");
        }
        else{
          friendInfos = await DoctorAccount.find({ _id: { $in: friendIds } }).select("fullName avatar");
        }

        // Ghép thông tin
        const friendData = user.friendList.map(friend => {
          const info = friendInfos.find(f => f._id.toString() === friend.user_id);
          return {
            user_id: friend.user_id,
            room_id: friend.room_id,
            fullName: info?.fullName || "Unknown",
            avatar: info?.avatar || null
          };
        });

        socket.emit("friendList", friendData);
      } catch (error) {
        console.error("Error getting friend list:", error);
        socket.emit("friendList", []);
      }
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected"); // Khi client disconnect thì log ra terminal.
    });
  });
  //End SocketIO
}

//[GET] /chat
module.exports.getMessages = async (req, res) => {
  const room_id = req.params.roomId;

  let find = {
    room_id: room_id,
    deleted: false
  }

  const chats = await Chat.find(find);

  // const results = await Promise.all(chats.map(async (chat) => {
  //   const infoUser = await Account.findOne({
  //     _id: chat.user_id
  //   }).select("fullName avatar");
  //   const chatObj = chat.toObject();
  //   chatObj.infoUser = infoUser;
  //   return chatObj;
  // }));

  return res.json(chats);
}

// [POST] /chat/createRoom
module.exports.createRoom = async (req, res) => {
  const { doctorId, clientId } = req.body;

  const exists = await RoomChat.findOne({
    users: { $all: [doctorId, clientId], $size: 2 }
  });

  if (exists) {
    return res.status(200).json({ message: "Room already exists", room: exists });
  }

  const record = new RoomChat({
    users: [doctorId, clientId]
  })
  await record.save();

  await DoctorAccount.findByIdAndUpdate(doctorId, {
    $addToSet: {
      friendList: { user_id: clientId, room_id: record._id.toString() }
    }
  });

  await Account.findByIdAndUpdate(clientId, {
    $addToSet: {
      friendList: { user_id: doctorId, room_id: record._id.toString() }
    }
  });
  res.status(201).json(
    {
      message: "Room created", room: record
    }
  );
}
