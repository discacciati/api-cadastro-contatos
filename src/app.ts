import express from "express";
import "dotenv/config";
import userRoute from "./routes/user.routes";
import contactRoute from "./routes/contact.routes";

const app = express();
app.use(express.json());

app.use("/user", userRoute);
app.use("/contact", contactRoute);

export default app;
