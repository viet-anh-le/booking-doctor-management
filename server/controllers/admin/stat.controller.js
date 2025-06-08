const Account = require("../../models/account.model")

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
    change: percentageChange.toFixed(2) + "%"
  });
}