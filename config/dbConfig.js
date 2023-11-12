const { default: mongoose } = require("mongoose");
const moongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URL);

const connection = mongoose.connection;

connection.on("connected", () => {
  console.log("mongodb connection is successfull");
});

connection.on("error", (error) => {
  console.log("Error in MongoDB connection", error);
});

module.exports = mongoose;
