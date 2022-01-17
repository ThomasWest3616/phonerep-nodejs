import express from "express";
import { connection } from '../database.js'
const router = express.Router();
const app = express();

router.use(express.json())

router.get("/getiphone5", (req, res) => {
    connection.query('SELECT * FROM pricelist WHERE pricelist.phonemodelid = 1', function (error, results, fields) {
        if (error) throw error;
        res.send(results)
    },

    )
});

router.get("/getiphone6", (req, res) => {
    connection.query('SELECT * FROM pricelist WHERE pricelist.phonemodelid = 2', function (error, results, fields) {
        if (error) throw error;
        res.send(results)
    },

    )
});

router.get("/getiphone7", (req, res) => {
    connection.query('SELECT * FROM pricelist WHERE pricelist.phonemodelid = 3', function (error, results, fields) {
        if (error) throw error;
        res.send(results)
    },

    )
});

router.get("/getiphone8", (req, res) => {
    connection.query('SELECT * FROM pricelist WHERE pricelist.phonemodelid = 3', function (error, results, fields) {
        if (error) throw error;
        res.send(results)
    },

    )
});



router.get('/delete/:id', (req, res) => {
    const id = req.params.id;
    connection.query(`DELETE FROM pricelist WHERE pricelistid = ${id}`, [req.params.id], (err, rows, fields) => {
        if (!err)
            res.redirect('/editiphone5');
        else
            console.log(err);
    })
});



router.post('/update', (req, res) => {
    const priceListId = req.body.id;
    let sql = "update pricelist SET model='" + req.body.model + "' where pricelistid =" + priceListId;
    connection.query(sql, (err, results) => {
        if (err) throw err;
        console.log("Phone model updated");
        res.redirect("/admin");
    });
});


router.post('/createiPhone5price', function (req, res) {
    var title = req.body.title;
    var time = req.body.time;
    var price = req.body.price;
    connection.query("INSERT INTO pricelist (title, time, price, phonemodelid) VALUES (?, ?, ?, 1)", [title.toString(), time.toString(), price.toString()], function (err, result) {
        if (err) throw err;
        console.log("New price added");
    });
    res.redirect("/editiphone5");
    res.end()
});

router.post('/createiPhone6price', function (req, res) {
    var title = req.body.title;
    var time = req.body.time;
    var price = req.body.price;
    connection.query("INSERT INTO pricelist (title, time, price, phonemodelid) VALUES (?, ?, ?, 2)", [title.toString(), time.toString(), price.toString()], function (err, result) {
        if (err) throw err;
        console.log("New price added");
    });
    res.redirect("/editiphone6");
    res.end()
});

router.post('/createiPhone7price', function (req, res) {
    var title = req.body.title;
    var time = req.body.time;
    var price = req.body.price;
    connection.query("INSERT INTO pricelist (title, time, price, phonemodelid) VALUES (?, ?, ?, 3)", [title.toString(), time.toString(), price.toString()], function (err, result) {
        if (err) throw err;
        console.log("New price added");
    });
    res.redirect("/editiphone7");
    res.end()
});



export default router;
