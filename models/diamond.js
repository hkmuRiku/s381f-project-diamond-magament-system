const mongoose = require("mongoose");
const mongourl =
  "mongodb+srv://developer:developer@cluster0.fbwjahy.mongodb.net/?retryWrites=true&w=majority";
mongoose
  .connect(mongourl)
  .then(() => {
    console.log("mongooseeeeeeeeeeeeeeeeeeeeeeeeeeeeeeconnected");
    console.log("----------------------------------------------");
  })
  .catch((e) => {
    console.log("failed");
  });

const diamondSchema = new mongoose.Schema(
  {
    diamondID: {
      type: String,
      required: true,
    },
    shape: {
      type: String,
      required: true,
    },
    carat: {
      type: Number,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    clarity: {
      type: String,
      required: true,
    },
    cut: {
      type: String,
      required: true,
    },
    polish: {
      type: String,
      required: true,
    },
    symmetry: {
      type: String,
      required: true,
    },
    fluorescence: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  { versionKey: false },
);

module.exports = mongoose.model("diamond", diamondSchema);
