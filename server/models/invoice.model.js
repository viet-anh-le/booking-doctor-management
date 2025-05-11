const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema(
  {
    app_id: String,
    serviceIds: Array,
    total: Number,
    due: Date,
    status: String
  }, {
    timestamps: true
  }
)

const Invoice = mongoose.model('Invoice', invoiceSchema, "invoices");

module.exports = Invoice;