const express = require("express");
const router = express.Router();
const User = require("../models/user");

//post
router.post("/create", (req, res, next) => {
  const user = new User({
    name: req.body.name,
    balance: req.body.balance,
  });
  user
    .save()
    .then((result) => res.send(result))
    .catch((error) => {
      if (error.code === 11000) {
        res.send({ message: "User name must be unique" });
      } else {
        res.send(error);
      }
    });
});
//get
router.get("/get", (req, res, next) => {
  User.find()
    .select("name -_id")
    .then((result) => {
      res.send(result);
    });
});
router.get("/get/:name", (req, res, next) => {
  User.findOne({ name: req.params.name })
    .select("-transactions")
    .then((result) => {
      res.send(result);
    });
});
router.get("/gettransaction/:name", (req, res, next) => {
  User.findOne({ name: req.params.name })
    .select(
      "transactions.count transactions.name transactions.date transactions.result transactions._id -_id"
    )
    .then((result) => {
      res.send(result.transactions);
    });
});

//edit
router.post("/edit/:id", (req, res, next) => {
  const update = {
    name: req.body.name,
    balance: req.body.balance,
  };

  User.findByIdAndUpdate(req.params.id, update, {
    new: true,
  })
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      if (error.code === 11000) {
        res.send("User name must be unique");
      } else {
        res.send(error);
      }
    });
});
//delete
router.post("/delete/:name", (req, res, next) => {
  User.findOneAndDelete({ name: req.params.name })
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      if (error.code === 11000) {
        res.send("User name must be unique");
      } else {
        res.send(error);
      }
    });
});
//
router.post("/getbydate", async (req, res, next) => {
  const data = req.body;

  User.findById(data.id).then((result) => {
    let tempinfo = [];
    let finalinfo = [];

    tempinfo = result.transactions.filter((trans) =>
      trans.date.toString().includes(data.date)
    );

    tempinfo.forEach((i) => {
      if (i) {
        finalinfo.push({
          name: i.name,
          count: i.count,
          date: i.date,
          result: i.result,
          _id: i._id,
        });
      }
    });
    res.send(finalinfo);
  });
});
module.exports = router;
