const { default: mongoose } = require("mongoose");

const dotenv = require("dotenv").config();

const mongo_uri = process.env.MONGO_URI;

const connect = () => {
  mongoose
    .connect(mongo_uri)
    .then(() => console.log("connected to DB"))
    .catch((error) => {
      console.log("ERROR: ", error);
    });
};

export default connect;
