import express from 'express';
import contact from "./routers/contact.js"

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(contact);

import { createPage } from './render.js';

const frontpagePage = createPage("frontpage/index.html", {
  title: "Phone-Rep | Welcome"
});

const contactPage = createPage("contact/contact.html");

const repairPage = createPage("repairspage/repair.html", {
  title: "Phone-Rep| Repairs"
});

const shopPage = createPage("shopspage/shops.html", {
  title: "Phone-Rep| Shops"
});

app.get("/contact", (req, res) => {
  res.send(contactPage);
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

