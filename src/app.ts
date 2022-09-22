import "reflect-metadata";
import "express-async-errors";
import express from "express";
import "dotenv/config";
import userRoute from "./routes/user.routes";
import contactRoute from "./routes/contact.routes";
import handleAppErrorMiddeware from "./middlewares/handleAppErrorMiddleware";

const app = express();
app.use(express.json());

app.use("/user", userRoute);
app.use("/contact", contactRoute);

app.use(handleAppErrorMiddeware);

export default app;
