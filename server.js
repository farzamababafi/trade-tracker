const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const port = 5050;
const mongoose = require("mongoose");
const cors = require("cors");
const transactionController = require("./controllers/transaction");
const userController = require("./controllers/user");

app.use(cors());
app.use("/transaction/images", express.static(path.join(__dirname, "uploads")));

/*
const adminRoute = require("./controllers/admin");
const User = require("./models/user");
*/
app.use(bodyParser.json());
/*app.use("/admin", adminRoute);
app.use("/user", userRoute);
*/
app.use("/user", userController);
app.use("/transaction", transactionController);

mongoose
  .connect(
    "mongodb+srv://farzamababafi:farzam1380@cluster0.gln1hth.mongodb.net/?retryWrites=true&w=majority"
  )
  .then((result) => {
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  })
  .catch((err) => console.log(err));
