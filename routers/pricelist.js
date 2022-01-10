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
            res.redirect('/admin');
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




router.post('/createPhone', function (req, res) {
    var name = req.body.name;
    var description = req.body.description;
    var link = req.body.link;
    connection.query("INSERT INTO pricelist (model, img) VALUES (?, ?)", [model.toString(), img.toString()], function (err, result) {
        if (err) throw err;
        console.log("New phone model added");
    });
    res.redirect("/admin");
    res.end()
});



export default router;
