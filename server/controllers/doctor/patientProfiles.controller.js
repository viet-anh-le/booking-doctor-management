const dayjs = require("dayjs");
const customParseFormat = require("dayjs/plugin/customParseFormat");
const utc = require("dayjs/plugin/utc");
dayjs.extend(customParseFormat);
dayjs.extend(utc);

const Appointment = require("../../models/appointment.model");
const Account = require("../../models/account.model");

// [GET] /doctor/patient-profiles/:id
module.exports.index = async (req, res) => {
  const id = req.params.id;

  let find = {
    doctor_id: id,
    statusPaid: true,
    status: { $ne: "reject" },
    deleted: false
  }

  const appointments = await Appointment.find(find);
  const clientsMap = new Map();

  for (let appointment of appointments) {
    const client_id = appointment.client_id.toString();
    if (!clientsMap.has(client_id)) {
      const client = await Account.findOne({ _id: client_id }).lean();
      clientsMap.set(client_id, {
        client_id,
        client_name: client.fullName,
        phone: client.phone,
        email: client.email,
        avatar: client.avatar,
        appointments: [appointment],
      });
    } else {
      clientsMap.get(client_id).appointments.push(appointment);
    }
  }

  return res.json([...clientsMap.values()]);
}
