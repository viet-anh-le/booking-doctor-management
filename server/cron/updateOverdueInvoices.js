global.crypto = require('crypto').webcrypto;

const cron = require('node-cron');
const Invoice = require("../models/invoice.model");
const dayjs = require('dayjs');

const startCronJob = () => {
  // Chạy mỗi ngày lúc 00:00
  cron.schedule('0 0 * * *', async () => {
    try {
      const currentDate = dayjs();
      
      // Tìm tất cả invoice chưa thanh toán và đã quá hạn
      const overdueInvoices = await Invoice.find({
        status: 'unpaid',
        due: { $lt: currentDate.toDate() }
      });

      // Cập nhật status thành overdue
      const updatePromises = overdueInvoices.map(invoice => 
        Invoice.updateOne(
          { _id: invoice._id },
          { $set: { status: 'overdue' } }
        )
      );

      await Promise.all(updatePromises);
      console.log(`Updated ${overdueInvoices.length} overdue invoices`);
    } catch (error) {
      console.error('Error updating overdue invoices:', error);
    }
  });
};

module.exports = startCronJob;