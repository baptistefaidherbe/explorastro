require("dotenv").config();
const express = require("express");
const router = require("./app/router");

const app = express();
const cors = require("cors");

const PORT = process.env.PORT || 3000;

app.use(cors({
  'Access-Control-Allow-Origin': '*',
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));





app.listen(PORT, _ => console.log(`Listening on http://localhost:${PORT}`));
