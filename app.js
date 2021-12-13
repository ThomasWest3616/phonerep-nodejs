import express from 'express';
import contact from "./routers/contact.js"
import session from 'express-session';
import { connection } from './database.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(contact);

app.use(session({
  secret: '2C44-4D44-WppQ38S',
  resave: true,
  saveUninitialized: true
}));

import { createPage } from './render.js';

const frontpagePage = createPage("frontpage/index.html", {
  title: "Phone-Rep | Welcome"
});

const contactPage = createPage("contact/contact.html");

const repairPage = createPage("repairspage/repair.html", {
  title: "Phone-Rep | Repairs"
});

const shopPage = createPage("shopspage/shops.html", {
  title: "Phone-Rep | Shops"
});

const loginPage = createPage("loginpage/login.html", {
  title: "Phone-Rep | Login"
});

const adminPage = createPage("adminpage/admin.html", {
  title: "Phone-Rep | Login"
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

app.get('/login', function (req, res) {
  res.send(loginPage)
});

app.get('/admin', function (request, response) {
  if (request.session.loggedin) {
    response.send(adminPage);
  } else {
    response.send(loginPage);
  }
  response.end();
});

app.post('/auth_login', function (request, response) {
  var username = request.body.username;
  var password = request.body.password;
  if (username && password) {
    connection.query('SELECT * FROM user WHERE username = ? AND password = ?', [username, password], function (error, results, fields) {
      if (results.length > 0) {
        request.session.loggedin = true;
        request.session.username = username;
        response.redirect('/admin');
      } else {
        response.send(loginPage);
      }
      response.end();
    });
  } else {
    response.send('Please enter Username and Password!');
    response.end();
  }
});

app.get('/logout', function (req, res) {
  req.session.destroy();
  res.send("logout success!");
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, (error) => {
  console.log("Server is running on", PORT);
});

