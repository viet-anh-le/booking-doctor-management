const mongoose = require("mongoose");
const Account = require("../../models/account.model");
const Appointment = require("../../models/appointment.model");
const Invoice = require("../../models/invoice.model");
const Service = require("../../models/service.model");

// [GET] /invoice?query=
module.exports.index = async (req, res) => {
  let records = [];
  if (req.query.bhyt) {
    const client = await Account.findOne({
      bhyt: req.query.bhyt
    })
    if (client) {
      if (req.query.client_id !== client._id.toString()){
        return res.status(404).json(records);
      }
    }
    else{
      return res.status(404).json(records);
    }
    if (req.query.phone) {
      if (req.query.phone !== client.phone) return res.status(404).json(records);
    }
    if (req.query.app_id){
      const invoice = await Invoice.findOne({ app_id: new mongoose.Types.ObjectId(req.query.app_id) });
      const appointment = await Appointment.findOne({ _id: new mongoose.Types.ObjectId(req.query.app_id)})
      if (invoice) {
        const serviceIds = invoice.serviceIds;
        const services = await Service.find({ _id: { $in: serviceIds } });
        records = [ {
          invoiceId: invoice._id,
          client_id: client._id,
          client_name: client.fullName,
          date: appointment.date,
          services: services,
          total: invoice.total,
          status: invoice.status,
          method: invoice.method
        }]
      }
      else {
        res.status(404).json(records);
      }
    }
    else{
      const appointments = await Appointment.find({
        client_id: client._id
      })
      records = await Promise.all(appointments.map(async (appointment) => {
        const invoice = await Invoice.findOne({ app_id: appointment._id });
        if (invoice) {
          const serviceIds = invoice.serviceIds;
          const services = await Service.find({ _id: { $in: serviceIds } });
          const servicesData = services.map(service => ({
            name: service.name,
            ppu: service.ppu
          }));
          return {
            invoiceId: invoice._id,
            client_id: client._id,
            client_name: client.fullName,
            date: appointment.date,
            services: servicesData,
            total: invoice.total,
            status: invoice.status,
            method: invoice.method
          };
        }
        else return null;
      }))
    }
    records = records.filter(invoice => invoice !== null);
    res.status(200).json(records);
  }
  else{
    res.status(404).json(records);
  }
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
