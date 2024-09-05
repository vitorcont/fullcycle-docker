const express = require("express");
const app = express();
const port = 3000;

const config = {
  host: "db",
  user: "root",
  password: "root",
  database: "nodedb-challenge",
};

const names = [
  "Vitor",
  "João",
  "Maria",
  "José",
  "Pedro",
  "Ana",
  "Luiza",
  "Lucas",
  "Fernanda",
  "Mariana",
];

const mysql = require("mysql");
const connection = mysql.createConnection(config);
const getInsertSql = (name) => `INSERT INTO people(name) values('${name}')`;
const selectSql = "SELECT * FROM people";
const createTableSql = `CREATE TABLE IF NOT EXISTS people (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255))`;

app.get("/", async (req, res) => {
  await new Promise((resolve, reject) => {
    connection.query(createTableSql, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });

  const randomName = names[Math.floor(Math.random() * names.length)];
  await new Promise((resolve, reject) => {
    connection.query(getInsertSql(randomName), (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });

  const response = await new Promise((resolve, reject) => {
    connection.query(selectSql, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
  const rows = response || [];

  res.send(
    "<h1>Full Cycle Rocks!</h1>" +
      rows.map((item) => `<li>${item.name}</li>`).join(""),
  );
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
