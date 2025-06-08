const Account = require("../../models/account.model");
const Appointment = require("../../models/appointment.model");
const Target = require("../../models/target.model");

// [GET] /admin/stat/count-user
module.exports.countUser = async (req, res) => {
  const now = new Date();
  const startOfThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);

  const thisMonthCount = await Account.countDocuments({
    createdAt: { $gte: startOfThisMonth, $lt: now }
  });

  const lastMonthCount = await Account.countDocuments({
    createdAt: { $gte: startOfLastMonth, $lt: startOfThisMonth }
  });

  let percentageChange = 0;
  if (lastMonthCount !== 0) {
    percentageChange = ((thisMonthCount - lastMonthCount) / lastMonthCount) * 100;
  } else if (thisMonthCount > 0) {
    percentageChange = 100;
  }

  res.json({
    thisMonth: thisMonthCount,
    lastMonth: lastMonthCount,
    change: percentageChange
  });
}

// [GET] /admin/stat/count-appointment
module.exports.countAppointment = async (req, res) => {
  const now = new Date();
  const startOfThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);

  const thisMonthCount = await Appointment.countDocuments({
    createdAt: { $gte: startOfThisMonth, $lt: now },
    statusPaid: true,
  });

  const lastMonthCount = await Appointment.countDocuments({
    createdAt: { $gte: startOfLastMonth, $lt: startOfThisMonth },
    statusPaid: true
  });

  let percentageChange = 0;
  if (lastMonthCount !== 0) {
    percentageChange = ((thisMonthCount - lastMonthCount) / lastMonthCount) * 100;
  } else if (thisMonthCount > 0) {
    percentageChange = 100;
  }

  res.json({
    thisMonth: thisMonthCount,
    lastMonth: lastMonthCount,
    change: percentageChange
  });
}

// [GET] /admin/stat/count-appointment12Month
module.exports.countAppointment12Month = async (req, res) => {
  const year = new Date().getFullYear();

  const monthlyCounts = await Appointment.aggregate([
    {
      $match: {
        createdAt: {
          $gte: new Date(`${year}-01-01T00:00:00Z`),
          $lte: new Date(`${year}-12-31T23:59:59Z`)
        },
        statusPaid: true
      }
    },
    {
      $group: {
        _id: { $month: "$createdAt" },
        count: { $sum: 1 }
      }
    },
    {
      $project: {
        _id: 0,
        month: '$_id',
        count: 1
      }
    }
  ]);

  const result = Array(12).fill(0);
    monthlyCounts.forEach(item => {
      result[item.month - 1] = item.count;
    });

  res.json({ year, monthlyCounts: result });
}

// [GET] /admin/stat/daily
module.exports.countDaily = async (req, res) => {
  try {
    const now = new Date();
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);

    const count = await Appointment.countDocuments({
      createdAt: { $gte: startOfDay, $lt: endOfDay },
      statusPaid: true,
    });

    res.json({
      date: startOfDay.toISOString().split('T')[0],
      count,
    });
  } catch (err) {
    console.error("Error in countDaily:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};


// [GET] /admin/stat/target
module.exports.getTarget = async (req, res) => {
  const month = new Date().getMonth() + 1;
  const year = new Date().getFullYear();
  const target = await Target.findOne({ month: month, year: year});
  res.json(target);
}

// [POST / PATCH] /admin/stat/target/create
module.exports.createTarget = async (req, res) => {
  const month = new Date().getMonth() + 1;
  const year = new Date().getFullYear();
  const target = await Target.findOne({ month: month, year: year});
  if (target){
    await Target.updateOne({
      month: month,
      year: year
    }, req.body);
    res.json({
      status: 200,
      message: "UPDATE TARGET SUCCESS"
    })
  }
  else{
    const record = new Target(req.body);
    await record.save();
    res.json({
      status: 200,
      message: "CREATE TARGET SUCCESS"
    })
  }
}