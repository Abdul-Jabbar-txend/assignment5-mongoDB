const mongoose = require("mongoose");
const mongoURI =
  "mongodb+srv://abduljabbarray:jabbar123@cluster0.qz7px.mongodb.net/mongoFirst?retryWrites=true&w=majority&appName=Cluster0";

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
