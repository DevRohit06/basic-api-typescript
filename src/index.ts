import express from "express";
import http from "http";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import comression from "compression";
import mongoose from "mongoose";
import router from "./router";
import 'dotenv/config'
const MONGO_URL = process.env.MONGO_URL
const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors({
    credentials: true,

}));

app.use(comression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL).then(() => { console.log("Connected to MongoDB")});
mongoose.connection.on("error", (err: Error) => { console.log(err)})
app.use('/', router())