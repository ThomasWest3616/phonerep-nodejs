import express from 'express';
import contact from "./routers/contact.js"
import session from 'express-session';
import { connection } from './database.js';
import phoneModelsRouter from './routers/phonemodels.js'
import { createPage } from './render.js';
import priceListRouter from './routers/pricelist.js'
import { Server } from "socket.io";

const app = express();

app.use(session({
  secret: '2C44-4D44-WppQ38S',
  resave: true,
  saveUninitialized: true
}));

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(contact);
app.use(phoneModelsRouter);
app.use(priceListRouter);


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

const pricePage = createPage("pricepage/editprices.html", {
  title: "Phone-Rep | Edit Prices"
});

const editIphone5Page = createPage("pricepage/editiphone5.html", {
  title: "Phone-Rep | iPhone 5 Edit Prices"
});

const editIphone6Page = createPage("pricepage/editiphone6.html", {
  title: "Phone-Rep | iPhone 6 Edit Prices"
});

const editIphone7Page = createPage("pricepage/editiphone7.html", {
  title: "Phone-Rep | iPhone 7 Edit Prices"
});

const phoneModelPage = createPage("phonemodelPage/phonemodel.html", {
  title: "Phone-Rep | Admin"
});

const iphone5Page = createPage("iphone5Page/iphone5.html", {
  title: "Phone-Rep | iPhone 5"
});

const iphone6Page = createPage("iphone6Page/iphone6.html", {
  title: "Phone-Rep | iPhone 6"
});

const iphone7Page = createPage("iphone7Page/iphone7.html", {
  title: "Phone-Rep | iPhone 7"
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

app.get('/iphone5', function (req, res) {
  res.send(iphone5Page)
});


app.get('/iphone6', function (req, res) {
  res.send(iphone6Page)
});

app.get('/iphone7', function (req, res) {
  res.send(iphone7Page)
});

app.get('/editprices', function (request, response) {

  if (request.session.loggedin) {
    response.send(pricePage);
  } else {
    response.send(loginPage);
  }
  response.end();

});

app.get('/editiphone5', function (request, response) {

  if (request.session.loggedin) {
    response.send(editIphone5Page);
  } else {
    response.send(loginPage);
  }
  response.end();
});



app.get('/editiphone6', function (request, response) {
  if (request.session.loggedin) {
    response.send(editIphone6Page);
  } else {
    response.send(loginPage);
  }
  response.end();
});

app.get('/editiphone7', function (request, response) {
  if (request.session.loggedin) {
    response.send(editIphone7Page);
  } else {
    response.send(loginPage);
  }
  response.end();
});


app.get('/admin', function (request, response) {


  if (request.session.loggedin) {
    response.send(adminPage);
  } else {
    response.send(loginPage);
  }
  response.end();
});

app.get('/phonemodel', function (request, response) {

  if (request.session.loggedin) {
    response.send(phoneModelPage);
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

const PORT = process.env.PORT || 8000;

app.listen(PORT, (error) => {
  console.log("Server is running on", PORT);
});

const io = new Server(3000, {
  cors: {
    origin: ['http://localhost:8080'],
  }
})


io.on("connection", socket => {
  console.log(socket.id)
  socket.on('send-message', (message, room) => {
    // socket.broadcast.emit("recieve-message", message)

    if (room === '') {
      socket.broadcast.emit("recieve-message", message)
    } else {
      socket.to(room).emit("recieve-message", message)
    }

  })

  socket.on('join-room', (room, cb) => {
    socket.join(room)

    cb(`Joined ${room}`)
  })
})

