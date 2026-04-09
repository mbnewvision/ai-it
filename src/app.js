import express from "express";
import dotenv from "dotenv";
import whatsappRoute from "./routes/whatsapp.js";

dotenv.config();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("AI IT Agent running 🚀");
});

app.use("/webhook/whatsapp", whatsappRoute);

app.listen(process.env.PORT, () => {
  console.log("Server running on port", process.env.PORT);
});
