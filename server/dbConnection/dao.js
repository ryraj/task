var mongoose = require("mongoose");
var config = require("../helpers/config")();
mongoose.Promise = global.Promise;
mongoose.connection.openUri(config.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

/*********** Events of mongoose connection. ****************/
// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on("connected", () => {
  console.log("Mongoose default connection open to " + config.DB_URL);
});

// If the connection throws an error
mongoose.connection.on("error", (err) => {
  console.log("Mongoose default connection error: " + err);
});
// When the connection is disconnected
mongoose.connection.on("disconnected", () => {
  console.log("Mongoose default connection disconnected");
});
// If the Node process ends, close the Mongoose connection
process.on("SIGINT", () => {
  mongoose.connection.close(() => {
    console.log(
      "Mongoose default connection disconnected through app termination"
    );
    process.exit(0);
  });
});

module.exports = {
  ////////user db
  user: require("../models/user/user"),
  order: require("../models/user/order"),
};
