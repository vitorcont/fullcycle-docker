const express = require("express");
const app = express();
const port = 3000;

const config = {
  host: "db",
  user: "root",
  password: "root",
  database: "nodedb",
};

const mysql = require("mysql");
const connection = mysql.createConnection(config);
const sql = `INSERT INTO people(name) values('Vitor')`;

app.get("/", (req, res) => {
  connection.query(sql);
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
