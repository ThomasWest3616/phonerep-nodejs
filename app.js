import express from 'express';
import contact from "./routers/contact.js"
import session from 'express-session';
import { connection } from './database.js';
import phoneModelsRouter from './routers/phonemodels.js'
import { createPage } from './render.js';
import { Server } from "socket.io";
import path from "path";
import escapeHTML from "escape-html";

import http from "http";

const app = express();
const server = http.createServer(app);

app.use(session({
  secret: '2C44-4D44-WppQ38S',
  resave: true,
  saveUninitialized: true
}));

const io = new Server(server);

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(contact);
app.use(phoneModelsRouter);


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
  title: "Phone-Rep | Admin"
});

const phoneModelPage = createPage("phonemodelPage/phonemodel.html", {
  title: "Phone-Rep | Admin"
});

const iphone5Page = createPage("iphone5Page/iphone5.html", {
  title: "Phone-Rep | iPhone 5"
});

// const supportpage = createPage("supportpage/index.html", {
//   title: "Phone-Rep | support"
// });

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

app.get('/iphone5', function (req, res) {
  res.send(iphone5Page)
});

app.get('/admin', function (request, response) {

  response.send(adminPage);

  // if (request.session.loggedin) {
  //   response.send(adminPage);
  // } else {
  //   response.send(loginPage);
  // }
  // response.end();
});

app.get('/phonemodel', function (request, response) {

  response.send(phoneModelPage);

  // if (request.session.loggedin) {
  //   response.send(adminPage);
  // } else {
  //   response.send(loginPage);
  // }
  // response.end();
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

const PORT = process.env.PORT || 8000;

server.listen(PORT, (error) => {
  console.log("Server is running on", PORT);
});

// const httpServer = createServer();
// const io = new Server(3000, {
//   cors: {
//     origin: ['http://localhost:8000'],
//   }
// })


io.on("connection", socket => {
  console.log(socket.id)
  socket.on('send-message', (message, room) => {
    // if (room === '') {
    //   socket.broadcast.emit("recieve-message", message)
    // } else {
    //   socket.to(room).emit("recieve-message", message)
    // }

    socket.on("a client choose a color", (color) => {

      io.emit("the server is sending the new color", escapeHTML(color));
    });

  })

  // socket.on('join-room', (room, cb) => {
  //   socket.join(room)

  //   cb(`Joined ${room}`)
  // })
})

app.get("/support", (req, res) => {
  res.sendFile(path.resolve() + "/public/colors.html");
});