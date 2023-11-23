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
const logInSchema = new mongoose.Schema({
  userid: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("userLogin", logInSchema);
