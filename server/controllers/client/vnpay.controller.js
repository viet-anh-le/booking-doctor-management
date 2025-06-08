const crypto = require("crypto");
const moment = require("moment");
const Schedule = require("../../models/schedule.model");
const Appointment = require("../../models/appointment.model");

module.exports.createQR = async (req, res) => {
  process.env.TZ = "Asia/Ho_Chi_Minh";

  const orderId = req.body.orderId;

  let date = new Date();
  let createDate = moment(date).format("YYYYMMDDHHmmss");
  let expireDate = moment(date).add(15, "minutes").format("YYYYMMDDHHmmss");
  let ipAddr = "127.0.0.1";
  const tmnCode = 'D5P22Q56';
  const secretKey = 'ESVI6WXP384P2DYNSE8TLIO2IS4EKXB7';
  const vnpUrl = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
  const returnUrl = `http://localhost:3002/api/vnpay/check-payment-vnpay?scheduleId=${req.body.scheduleId}&appointmentId=${orderId}`;

  let locale = "vn";
  let currCode = "VND";

  let vnp_Params = {
    vnp_Version: "2.1.0",
    vnp_Command: "pay",
    vnp_TmnCode: tmnCode,
    vnp_Locale: locale,
    vnp_CurrCode: currCode,
    vnp_TxnRef: orderId,
    vnp_OrderInfo: `Payment for ${orderId}`,
    vnp_OrderType: "other",
    vnp_Amount: req.body.amount * 100,
    vnp_ReturnUrl: returnUrl,
    vnp_IpAddr: ipAddr,
    vnp_CreateDate: createDate,
    vnp_ExpireDate: expireDate,
  };
  const sortedParams = sortParams(vnp_Params);

  const urlParams = new URLSearchParams();
  for (let [key, value] of Object.entries(sortedParams)) {
    urlParams.append(key, value);
  }

  const querystring = urlParams.toString();

  const hmac = crypto.createHmac("sha512", secretKey);
  const signed = hmac.update(querystring).digest("hex");

  urlParams.append("vnp_SecureHash", signed);

  const paymentUrl = `${vnpUrl}?${urlParams.toString()}`;

  res.json({
    success: true,
    paymentUrl: paymentUrl,
  });
};
function sortParams(obj) {
  const sortedObj = Object.entries(obj)
    .filter(
      ([key, value]) => value !== "" && value !== undefined && value !== null
    )
    .sort(([key1], [key2]) => key1.toString().localeCompare(key2.toString()))
    .reduce((acc, [key, value]) => {
      acc[key] = value;
      return acc;
    }, {});

  return sortedObj;
}

module.exports.check = async (req, res) => {
  try {
    if (!req.query.vnp_ResponseCode || !req.query.vnp_TxnRef) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    console.log(req.query);
    const status = req.query.vnp_TransactionStatus;
    if (status === '00') {
      const scheduleId = req.query.scheduleId;
      await Schedule.updateOne({
        _id: scheduleId
      }, { $inc: { sumBooking: 1 } });
      const appointmentId = req.query.appointmentId;
      await Appointment.updateOne({
        _id: appointmentId
      }, {
        statusPaid: true,
        services: ['683d4911cc0b92e7e08538ca']
      });
      res.redirect("http://localhost:5173/pay-success")
    }
    else{
      res.redirect("http://localhost:5173/pay-fail")
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error server",
    });
  }
};