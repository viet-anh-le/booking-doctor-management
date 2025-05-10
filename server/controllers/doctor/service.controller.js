const dayjs = require("dayjs");
const customParseFormat = require("dayjs/plugin/customParseFormat");
const utc = require("dayjs/plugin/utc");
dayjs.extend(customParseFormat);
dayjs.extend(utc);

const Service = require("../../models/service.model.js");

//[GET] /doctor/service
module.exports.index = async (req, res) => {
  let find = {
    deleted: false
  }

  const records = await Service.find(find);
  return res.json(records)
}

