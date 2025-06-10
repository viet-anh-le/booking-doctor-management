const Account = require("../../models/account.model");
const Appointment = require("../../models/appointment.model");

// [GET] /patient-accounts
module.exports.index = async (req, res) => {
  try {
    const accounts = await Account.find({ email: { $exists: true } });

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const records = await Promise.all(
      accounts.map(async (account) => {
        const accountId = account._id;
        const profileIds = account.profiles || [];

        const baseQuery = {
          $or: [
            { client_id: accountId },
            { client_id: { $in: profileIds } }
          ]
        };

        const totalAppointments = await Appointment.countDocuments(baseQuery);

        const todayAppointments = await Appointment.countDocuments({
          ...baseQuery,
          createdAt: { $gte: today, $lt: tomorrow }
        });

        return {
          ...account.toObject(),
          profilesLen: profileIds.length + 1,
          totalAppointments,
          todayAppointments
        };
      })
    );

    res.json(records);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// [PATCH] /patient-accounts/delete/:id
module.exports.delete = async (req, res) => {
  await Account.updateOne({
    _id: req.params.id
  }, req.body);
  res.json({
    status: 200
  })
}