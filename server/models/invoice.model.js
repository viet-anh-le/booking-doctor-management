const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema(
  {
    app_id: String,
    serviceIds: Array,
    total: Number,
    status: String,
    method: String,
  }, {
    timestamps: true
  }
)

const Invoice = mongoose.model('Invoice', invoiceSchema, "invoices");

module.exports = Invoice;