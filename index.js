const express = require('express');
const cors = require('cors');
const cookies = require('cookie-parser');
const DB = require('./src/DB/DB');
const { Errormiddle } = require('./src/Middlewares/error');
const userrouter = require("./src/Routes/userRouter")

require("dotenv").config()

const app = express()
app.use(cors({
    origin: [process.env.FR0NT_URL],
    methods: ['GET', 'post', 'put', 'delete'],
    credentials: true,
}))
app.use(cookies())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1", userrouter)
DB()
app.use(Errormiddle)


module.exports = app;