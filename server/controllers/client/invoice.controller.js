const Invoice = require("../../models/invoice.model");
const Appointment = require("../../models/appointment.model");
const Service = require("../../models/service.model");

// [GET] /invoice/:id
module.exports.index = async (req, res) => {
  const client_id = req.params.id;
  let find = {
    client_id: client_id,
    deleted: false
  }

  const appointments = await Appointment.find(find);
  const invoicesSend = await Promise.all(appointments.map(async (appointment) => {
    const invoice = await Invoice.findOne({ app_id: appointment._id });
    if (invoice){
      const serviceIds = invoice.serviceIds;
      const services = await Service.find({ _id: { $in: serviceIds } });
      const servicesData = services.map(service => ({
        name: service.name,
        ppu: service.ppu
      }));
      return {
        invoiceId: invoice._id,
        date: appointment.date,
        services: servicesData,
        total: invoice.total,
        due: invoice.due,
        status: invoice.status
      };
    }
    else return null;
  }))
  const filteredInvoices = invoicesSend.filter(invoice => invoice !== null);
  return res.json(filteredInvoices);
}
