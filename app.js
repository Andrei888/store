import express from "express";
import bodyParser from "body-parser";
import "dotenv/config";

const app = express();

app.use(bodyParser.json());

app.get("/", (req, res) => res.send("Hello social"));

// start

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Failed to connected to MongoDB", error);
  }
};

connectDB();
