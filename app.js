import express from 'express';

const app = express();
app.use(express.static("public"));

const frontpagePage = createPage("frontpage/index.html", {
    title: "Phone-Rep | Welcome"
});

const repairPage = createPage("frontpage/repair.html", {
    title: "Phone-Rep| Repairs"
});

const frontpagePage = createPage("frontpage/shops.html", {
    title: "Nodefolio | Shops"
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


