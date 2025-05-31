import express from "express";
import dotenv from "dotenv";
// const transactionsRouter = await import('./routes/transactions.ts')
import bodyParser from "body-parser";
import cors from "cors";
import connectDB from "./config/dbconn";
import userRoutes from "./routes/userRoutes";
import propertyRoutes from "./routes/propertyRoutes"
import favRoutes from "./routes/favRoutes"
import recommendationRoutes from "./routes/recommendationRoutes"

// import { importCSV } from "./controllers/propertyCtrl";

dotenv.config({
  path: "./.env",
});
const PORT = process.env.PORT || 5000
connectDB();

const app = express();
app.use(express.json());


app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World");
});
// app.use("/api/auth", (req, res, next) => {
//   console.log("Test route middleware");
//   next();
// });
app.use("/api/user", userRoutes);
app.use("/api/property", propertyRoutes);
app.use("/api/fav", favRoutes);
app.use("/api/recommendation", recommendationRoutes);
app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});

// importCSV()