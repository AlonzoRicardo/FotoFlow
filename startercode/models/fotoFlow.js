const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const fotoFlowSchema = new Schema({
  title: String,
  description: String,
  imgArr: Array
}, {
  timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" }
});

var FotoFlow = mongoose.model("FotoFlow", fotoFlowSchema);

module.exports = FotoFlow;