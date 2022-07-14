const mongoose = require("mongoose");
const mongoURI =
  "mongodb+srv://akbar:Ahmed@cluster0nc.iumhezm.mongodb.net/?retryWrites=true&w=majority";

let connectToMongo = () => {
  mongoose
    .connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected To MongoDB Successfully");
    })
    .catch((err) => console.log(err + "No Connection"));
};

module.exports = connectToMongo;
