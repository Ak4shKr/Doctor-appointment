const { default: mongoose } = require("mongoose");
const moongoose = require("mongoose");
// mongoose.connect(process.env.MONGO_URL);
const mongoURI = "mongodb://localhost:27017/sheyhealthy";

mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error: ", err));

const connection = mongoose.connection;

connection.on("connected", () => {
  console.log("mongodb connection is successfull");
});

connection.on("error", (error) => {
  console.log("Error in MongoDB connection", error);
});

module.exports = mongoose;
