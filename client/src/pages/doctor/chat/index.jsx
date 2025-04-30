import { useState, useEffect, useRef } from "react";
import socketIOClient from "socket.io-client";
import { useSelector } from "react-redux";
import { PictureOutlined, PlusOutlined } from '@ant-design/icons';
import { Image, Upload } from 'antd';

const host = "http://localhost:3002/";
const serverURL = import.meta.env.VITE_SERVER_URL;

const getBase64 = file =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

//Preview Image
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
          resolve(value);
        });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
//End Preview Image

function DoctorChat() {
  const [mess, setMess] = useState([]);
  const [message, setMessage] = useState('');
  const doctorAccount = useSelector(state => state.doctorAccountReducer);
  const [room_id, setRoomId] = useState(doctorAccount.friendList.length > 0 ? doctorAccount.friendList[0].room_id : undefined);
  const [friendList, setFriendList] = useState([]);
  const [currentFriend, setCurrentFriend] = useState(undefined);

  const socketRef = useRef();
  useEffect(() => {
    const fetchChats = async () => {
      const response = await fetch(`${serverURL}/api/chat/${room_id}`, {
        method: "GET",
        credentials: "include"
      })
      const result = await response.json();
      if (result) {
        console.log(result);
        setMess(result);
        const scrollView = document.querySelector("div[name='scroll-view']");
        scrollView.scrollTop = scrollView.scrollHeight;
      }
    }
    fetchChats();

    socketRef.current = socketIOClient.connect(host);

    socketRef.current.on('sendDataServer', dataGot => {
      setMess(oldMsgs => [...oldMsgs, {
        user_id: dataGot.user_id,
        content: dataGot.content,
        images: dataGot.images
      }])
    })

    socketRef.current.emit('getFriendList', { user_id: doctorAccount._id, role: doctorAccount.role });

    socketRef.current.on("friendList", (friends) => {
      console.log("Danh sách bạn bè:", friends);
      setFriendList(friends);
      setCurrentFriend(friends[0]);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  const sendMessage = () => {
    const images = [];
    fileList.forEach((file, index) => {
      images.push(file.originFileObj);
    });
    console.log(images)
    if ((message !== null && message !== "") || images.length > 0) {
      const msg = {
        user_id: doctorAccount._id,
        content: message,
        images: images,
        room_id: room_id
      }
      socketRef.current.emit('sendDataClient', msg);
      setTimeout(() => {
        const scrollView = document.querySelector("div[name='scroll-view']");
        scrollView.scrollTop = scrollView.scrollHeight;
      }, 500);
      setMessage('');
      setFileList([]);
      setIsClick(false);
    }
  }

  const renderMess = mess.map((m, index) =>
    <div
      key={index}
      className={`${m.user_id !== doctorAccount._id ? 'col-start-1 col-end-8 p-3 rounded-lg' : 'col-start-6 col-end-13 p-3 rounded-lg'} chat-item`}
    >
      <div className={`flex items-center justify-start ${m.user_id === doctorAccount._id ? 'flex-row-reverse' : 'flex-row'}`}>
        <div
          className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0"
        >
          A
        </div>
        <div
          className={`relative text-sm bg-white py-2 px-4 shadow rounded-xl ${m.user_id === doctorAccount._id ? "mr-3" : "ml-3"}`}
        >
          <div>{m.content}</div>
          {m.images.length > 0 && (
            <Image.PreviewGroup>
              {m.images.map((imgUrl, i) => {
                return <Image
                  key={i}
                  src={imgUrl}
                  alt={`msg-img-${i}`}
                  height={200}
                />
              })}
            </Image.PreviewGroup>
          )}
        </div>
      </div>
    </div>
  )

  const handleClick = (friend) => {
    const fetchChats = async () => {
      const response = await fetch(`${serverURL}/api/chat/${friend.room_id}`, {
        method: "GET",
        credentials: "include"
      })
      const result = await response.json();
      if (result) {
        console.log(result);
        setMess(result);
        const scrollView = document.querySelector("div[name='scroll-view']");
        scrollView.scrollTop = scrollView.scrollHeight;
      }
    }
    fetchChats();
    setCurrentFriend(friend);
    setRoomId(friend.room_id);
  }

  const [isClick, setIsClick] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [fileList, setFileList] = useState([]);
  const handlePreview = file =>
    __awaiter(void 0, void 0, void 0, function* () {
      if (!file.url && !file.preview) {
        file.preview = yield getBase64(file.originFileObj);
      }
      setPreviewImage(file.url || file.preview);
      setPreviewOpen(true);
    });
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
  return (
    <>
      <div className="flex h-screen antialiased text-gray-800">
        <div className="flex flex-row h-full w-full overflow-x-hidden">
          <div className="flex flex-col py-8 pl-6 pr-2 w-64 bg-white flex-shrink-0">
            <div className="flex flex-row items-center justify-center h-12 w-full">
              <div
                className="flex items-center justify-center rounded-2xl text-indigo-700 bg-indigo-100 h-10 w-10"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                  ></path>
                </svg>
              </div>
              <div className="ml-2 font-bold text-2xl">QuickChat</div>
            </div>
            <div
              className="flex flex-col items-center bg-indigo-100 border border-gray-200 mt-4 w-full py-6 px-4 rounded-lg"
            >
              <div className="h-20 w-20 rounded-full border overflow-hidden">
                <img
                  src="https://avatars3.githubusercontent.com/u/2763884?s=128"
                  alt="Avatar"
                  className="h-full w-full"
                />
              </div>
              <div className="text-sm font-semibold mt-2">{currentFriend?.fullName}</div>
              <div className="flex flex-row items-center mt-3">
                <div
                  className="flex flex-col justify-center h-4 w-8 bg-indigo-500 rounded-full"
                >
                  <div className="h-3 w-3 bg-white rounded-full self-end mr-1"></div>
                </div>
                <div className="leading-none ml-1 text-xs">Active</div>
              </div>
            </div>
            <div className="flex flex-col mt-8">
              <div className="flex flex-row items-center justify-between text-xs">
                <span className="font-bold">Conversations</span>
                <span
                  className="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full"
                >4</span
                >
              </div>
              <div className="flex flex-col space-y-1 mt-4 -mx-2 h-48 overflow-y-auto">
                {
                  friendList.map((friend, index) => {
                    return (
                      <button
                        key={index}
                        className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2"
                        onClick={() => handleClick(friend)}
                      >
                        <div
                          className="flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full"
                        >
                          H
                        </div>
                        <div className="ml-2 text-sm font-semibold">{friend.fullName}</div>
                      </button>
                    )
                  })
                }
              </div>
            </div>
          </div>
          <div className="flex flex-col flex-auto max-h-screen p-6">
            <div
              className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4"
            >
              <div className="flex flex-col h-full overflow-x-auto mb-4">
                <div className="flex flex-col h-full overflow-y-auto" name="scroll-view">
                  <div className="grid grid-cols-12 gap-y-2 h-auto">
                    {renderMess}
                  </div>
                </div>
              </div>

              <div className="p-2 bg-gray-100 rounded-xl relative w-full">
                <div
                  className="flex flex-row items-center h-16 rounded-xl bg-white w-full h-full px-4"
                >
                  <button onClick={() => setIsClick(true)}>
                    <PictureOutlined style={{ fontSize: "150%", background: "none" }} className="self-end" />
                  </button>
                  <div className="flex-grow ml-4">
                    <div className="relative w-full mt-4">
                      {isClick &&
                        <Upload
                          listType="picture-card"
                          fileList={fileList}
                          onPreview={handlePreview}
                          onChange={handleChange}
                          beforeUpload={() => {
                            return false;
                          }}
                        >
                          <button style={{ border: 0, background: 'none' }} type="button">
                            <PlusOutlined />
                            <div style={{ marginTop: 8 }}>Upload</div>
                          </button>
                        </Upload>
                      }
                      {previewImage && (
                        <Image
                          wrapperStyle={{ display: 'none' }}
                          preview={{
                            visible: previewOpen,
                            onVisibleChange: visible => setPreviewOpen(visible),
                            afterOpenChange: visible => !visible && setPreviewImage(''),
                          }}
                          src={previewImage}
                        />
                      )}
                      <input
                        type="text"
                        className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10 mt-4 mb-4"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            sendMessage();
                          }
                        }}
                      />
                    </div>
                  </div>
                  <div className="ml-4">
                    <button
                      className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0"
                      onClick={sendMessage}
                    >
                      <span>Send</span>
                      <span className="ml-2">
                        <svg
                          className="w-4 h-4 transform rotate-45 -mt-px"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                          ></path>
                        </svg>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default DoctorChat;