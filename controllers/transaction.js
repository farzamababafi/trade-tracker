const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Transaction = require("../models/transaction");
const multer = require("multer");
const transaction = require("../models/transaction");
const storage = multer.diskStorage({
  destination: "./uploads",
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.post("/post", upload.single("file"), async (req, res, next) => {
  const transactionObj = JSON.parse(req.body.transactionObj);
  const userId = req.body.id;
  date = new Date().toLocaleString("en-IR");

  const fileUrl = req.file.filename;
  const countObj = await User.findById(userId);
  let count = countObj.transactions.length + 1;
  const transaction = {
    count,
    name: transactionObj.name,
    balance: transactionObj.balance,
    date,
    amountOfRisk: transactionObj.amountOfRisk,
    emotionRate: transactionObj.emotionRate,
    lot: transactionObj.lot,
    position: transactionObj.position,
    risk: transactionObj.risk,
    rr: transactionObj.rr,
    score: transactionObj.score,
    emotion: transactionObj.emotions,
    condition: transactionObj.conditions,
    result: transactionObj.result ? transactionObj.result : "null",
    firstImageUrl: `${fileUrl}`,
    firstPictureOpinion: req.body.textOpinion,
  };

  User.findByIdAndUpdate(
    userId,
    { $push: { transactions: transaction } },
    { new: true }
  ).then((result) => {
    res.send(result.transactions[result.transactions.length - 1]);
  });
});

router.post("/update/:id", upload.single("file"), async (req, res, next) => {
  const resultObj = JSON.parse(req.body.resultObj);
  const fileUrl = req.file.filename;
  const userId = req.body.userId;
  const user = await User.findById(userId);

  let updatedTransacion = user.transactions.find(
    (trans) => trans._id.toString() === req.params.id
  );

  updatedTransacion.changeAmount = resultObj.amount;
  updatedTransacion.result = resultObj.result;
  updatedTransacion.kindOfResult = resultObj.kindOfResult;
  updatedTransacion.secondImageUrl = `${fileUrl}`;
  updatedTransacion.secondPictureOpinion = req.body.textOpinion;

  User.findByIdAndUpdate(
    userId,
    {
      $set: { "transactions.$[trans]": updatedTransacion },
      $inc: {
        balance: resultObj.amount,
      },
    },
    {
      arrayFilters: [{ "trans._id": req.params.id }],
      new: true,
    }
  ).then((result) => {
    res.send(result.transactions[0]);
  });
});
router.post("/get/:id", async (req, res, next) => {
  User.findById(req.body.userId)
    .then(async (result) => {
      let data = await result.transactions.find(
        (trans) => trans._id.toString() === req.params.id
      );

      res.send(data);
    })
    .catch((err) => res.send(err));
});

module.exports = router;
