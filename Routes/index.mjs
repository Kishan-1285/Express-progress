import express from "express";
// import { getUserIndexById } from "./utils/middleware.mjs";
// import { getparamsById } from "./utils/middleware.mjs";
import {users} from './utils/value.mjs';
import userRouter from "./Router/user.mjs";

const app = express();


app.use(express.json());

app.use(userRouter);


app.listen("3000",()=>{
    console.log("app is running on the port 3000");
})