require("dotenv").config();
const express = require("express");
const router = require("./app/router");
const mongobd = require("./app/mangoDb");
const webSocket = require('./app/utils/webSocket');
const app = express();
const Server = require("http").Server;
const socket = require("socket.io");
const server = Server(app);
const cors = require("cors");

const PORT = process.env.PORT || 3000;
mongobd;
app.use(
  cors({
    "Access-Control-Allow-Origin": "*",
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(router);

const io = socket(server);

webSocket(io);

server.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
