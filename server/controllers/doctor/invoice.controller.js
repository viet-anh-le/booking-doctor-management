const Invoice = require("../../models/invoice.model");

// [GET] /doctor/invoice/:appId
module.exports.index = async (req, res) => {
  const app_Id = req.params.appId;
  let find = {
    app_id: app_Id
  }
  const invoice = await Invoice.findOne(find);
  if (!invoice) {
    return res.json({
      status: 404,
      message: "INVOICE NOT FOUND"
    })
  }
  res.json({
    status: 200,
    invoice: invoice
  });
}

// [POST] /doctor/invoice/create
module.exports.create = async (req, res) => {
  const record = new Invoice(req.body);
  await record.save();
  res.json({
    status: 200,
    message: "CREATE INVOICE SUCCESS"
  })
}

// [PATCH] /doctor/invoice/edit/:id
module.exports.edit = async (req, res) => {
  await Invoice.updateOne({
    _id: req.params.id
  }, req.body);
  res.json({
    status: 200,
    message: "UPDATE INVOICE SUCCESS"
  })
}

