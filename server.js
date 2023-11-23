console.log("⎛⎝Ｏ⏝⏝Ｏ⎛⎝⎛⎝Ｏ⏝⏝Ｏ⎛⎝⎛⎝Ｏ⏝⏝Ｏ⎛⎝⎛⎝Ｏ⏝⏝Ｏ⎛⎝");
/*Constants Part*/
const express = require("express");
const session = require("cookie-session");
const bodyParser = require("body-parser");
const app = express();
const SECRETKEY = "dms381f";
const mongoose = require("mongoose");
const mongourl =
  "mongodb+srv://developer:developer@cluster0.fbwjahy.mongodb.net/?retryWrites=true&w=majority";

const port = process.env.PORT || 8099;
console.log("----------------------------------------------");
/*Constants Part*/
/*Function*/
function connctdb() {
  mongoose
    .connect(mongourl)
    .then(() => {
      console.log("mongooseeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");
      console.log("----------------------------------------------");
    })
    .catch((e) => {
      console.log("failed");
    });
}
/*Function*/
/*app.set & app.use*/
app.set("view engine", "ejs");
app.use(
  session({
    name: "loginSession",
    keys: [SECRETKEY],
  }),
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
/*app.set & app.use*/
/*app.get*/
app.get("/", (req, res) => {
  if (!req.session.authenticated) {
    res.render("login");
  } else {
    res.status(200).render("main", { name: req.session.username });
  }
});
app.get("/login", (req, res) => {
  console.log("Welcome");
  return res.status(200).render("login");
});
app.get("/crud", async (req, res) => {
  try {
    var diamondCollection = require("./models/diamond");
    var countdata = await diamondCollection.find().count();
    var data = await diamondCollection.find().exec();
    console.log("Get " + countdata + " Diamonds data");
    console.log("----------------------------------------------");
    //console.log(typeof data);
    //req.session.countdata = countdata;
    return res.status(200).render("crud", { countdata: countdata, data: data });
    //mongoose.connection.close();
  } catch {
    mongoose.connection.close();
    return res.send("wrong details");
  }
});
/*app.get*/
/*Login part*/
app.post("/login", async (req, res) => {
  let LogInCollection = require("./models/user");
  try {
    const check = await LogInCollection.findOne({ userid: req.body.name });
    if (check.password === req.body.password) {
      req.session.authenticated = true;
      req.session.username = req.body.name;
      console.log("Login");
      console.log("User : " + req.session.username + "\nDate : " + Date());
      console.log("----------------------------------------------");
      return res.redirect("/");
    } else {
      //mongoose.connection.close();
      res.send("incorrect password");
    }
  } catch (e) {
    //mongoose.connection.close();
    res.send("wrong details");
  }
});
/*Login part*/
/*Create part*/
app.post("/create", async (req, res) => {
  let data = {
    diamondID: req.body.diamondID,
    shape: req.body.shape,
    carat: req.body.carat,
    color: req.body.color,
    clarity: req.body.clarity,
    cut: req.body.cut,
    polish: req.body.polish,
    symmetry: req.body.symmetry,
    fluorescence: req.body.fluorescence,
    price: req.body.price,
  };
  let diamondCollection = require("./models/diamond");
  try {
    const check = await diamondCollection.findOne({
      diamondID: req.body.diamondID,
    });
    if (check.diamondID === req.body.diamondID) {
      res.send("This diamond data already insert");
      mongoose.connection.close();
    } else {
      res.send("wrong details");
      mongoose.connection.close();
    }
  } catch (e) {
    await diamondCollection.insertMany([data]);
    console.log("one data was already inserted");
    console.log("Json Format: \n" + JSON.stringify(data));
    console.log("----------------------------------------------");
    res.redirect("/crud");
  }
});
/*Create part*/
/*Select part*/
app.get("/select", async (req, res) => {
  let diamondCollection = require("./models/diamond");
  try {
    const check = await diamondCollection.findOne({
      diamondID: req.query.selectID,
    });
    if (check.diamondID === req.query.selectID) {
      let countdata = await diamondCollection.find().count();
      var data = await diamondCollection
        .find({ diamondID: req.query.selectID })
        .exec();
      console.log("Get Diamond ID : " + req.query.selectID + " data");
      console.log("----------------------------------------------");
      //console.log(typeof data);
      //req.session.countdata = countdata;
      return res
        .status(200)
        .render("crud", { countdata: countdata, data: data });
    } else {
      res.send("no diamondID : " + req.query.selectID + " data");
    }
  } catch {
    return res.send("no diamondID : " + req.query.selectID + " data");
    //return res.send("wrong details");
  }
});
/*Select part*/
/*Update part*/
app.get("/:_id", async (req, res) => {
  //console.log(req.params._id);
  //console.log(req.query._id);
  let editID = { _id: req.query._id };
  let diamondCollection = require("./models/diamond");
  try {
    //console.log(editID);
    var updatedata = await diamondCollection.find(editID).exec();
    res.status(200).render("edit", { updatedata: updatedata });
    //console.log(updatedata);
  } catch {
    res.send("wrong details");
  }
});

app.put("/updateDiamond/:id", async (req, res) => {
  let updateID = { _id: req.params.id };
  let updata = {
    diamondID: req.body.diamondID,
    shape: req.body.shape,
    carat: req.body.carat,
    color: req.body.color,
    clarity: req.body.clarity,
    cut: req.body.cut,
    polish: req.body.polish,
    symmetry: req.body.symmetry,
    fluorescence: req.body.fluorescence,
    price: req.body.price,
  };
  let diamondCollection = require("./models/diamond");
  try {
    let updatedata = await diamondCollection.findByIdAndUpdate(
      updateID,
      updata,
    );
    console.log(
      "Diamond ID : " + updata.diamondID + " data was already updated",
    );
    console.log("Current Data " + JSON.stringify(updata));
    console.log("----------------------------------------------");
    res.send("update data successful");
    //res.redirect("/crud");
  } catch {
    res.send("error");
  }
});
/*Update part*/

/*Delete part*/
app.delete("/deleteDiamond/:id", async (req, res) => {
  let deleteID = { _id: req.params.id };
  let diamondCollection = require("./models/diamond");
  try {
    let deletedata = await diamondCollection.findByIdAndDelete(deleteID);
    console.log("one data was already deleted");
    console.log("----------------------------------------------");
    res.send("delete data successful");
    //res.redirect("/crud");
  } catch {
    res.send("wrong details");
  }
});
/*Delete part*/
/*Logout part*/
app.get("/logout", (req, res) => {
  console.log("User : " + req.session.username + "\nDate : " + Date());
  console.log("----------------------------------------------");
  req.session = null;
  req.authenticated = false;
  return res.redirect("/");
});
/*Logout part*/
app.listen(port);
