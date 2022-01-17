import express from "express";
import { connection } from '../database.js'
const router = express.Router();
const app = express();

router.use(express.json())

router.get("/phonemodels", (req, res) => {
    connection.query('SELECT * FROM phonemodel', function (error, results, fields) {
        if (error) throw error;
        res.send(results)
    },

    )
});


router.get('/delete/:id', (req, res) => {
    const id = req.params.id;
    connection.query(`DELETE FROM phonemodel WHERE phonemodelid = ${id}`, [req.params.id], (err, rows, fields) => {
        if (!err)
            res.redirect('/admin');
        else
            console.log(err);
    })
});



router.post('/update', (req, res) => {
    const phoneModelId = req.body.id;
    let sql = "update phonemodel SET model='" + req.body.model + "' where phonemodelid =" + phoneModelId;
    connection.query(sql, (err, results) => {
        if (err) throw err;
        console.log("Phone model updated");
        res.redirect("/admin");
    });
});



export default router;
