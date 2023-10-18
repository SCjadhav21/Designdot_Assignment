require("dotenv").config();
const { connection } = require("./Confige/db");
const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log(`Connected to DataBase`);
  } catch (err) {
    console.log("Error: cant connect to mongodb" + err);
  }

  console.log(`running on port ${process.env.port}`);
});
