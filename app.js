import express from 'express';
import { connection } from './database.js';
import mysql from 'mysql';

const app = express();
app.use(express.static("public"));

import { createPage } from './render.js';

const frontpagePage = createPage("frontpage/index.html", {
    title: "Phone-Rep | Welcome"
});

const repairPage = createPage("repairspage/repair.html", {
    title: "Phone-Rep| Repairs"
});

const shopPage = createPage("shopspage/shops.html", {
    title: "Phone-Rep| Shops"
});


app.get('/', function (req, res) {
    res.send(frontpagePage)
  });

app.get('/repairs', function (req, res) {
    res.send(repairPage)
  });


  app.get('/shops', function (req, res) {
    res.send(shopPage)
  });

  const PORT = process.env.PORT || 8080;

app.listen(PORT, (error) => {
    console.log("Server is running on", PORT);
});

