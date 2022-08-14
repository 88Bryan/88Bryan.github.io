const express = require('express');
const path = require('path');
const router = express.Router();
const { selectQuery, createAndInsertTable } = require('../db/database');

router.get('/all', async(req, res) => {
    try {
        const result = await selectQuery("SELECT * FROM goats");
        res.send(result);
    } catch (err) {
        console.error(err);
        res.send({ "error": e });
    }

})

router.get('/:id', async(req, res) => {
    try {
        const result = await selectQuery(`SELECT * FROM goats WHERE id=${req.params.id}`);
        res.send(result);
    } catch (err) {
        console.error(err);
        res.send({ "error": e });
    }
})

router.get('/details/:id', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/details.html'));
})

router.post('/add', async(req, res) => {
    try {
        const keys = ["name", "gender", "age", "weight", "farm", "price", "image"];
        for (let key of keys) {
            if (!(req.body.hasOwnProperty(key))) {
                res.send({ "error": "invalid data. Please send name, gender, age, weight, farm, price, image" })
                return
            }
        }
        // id is auto-incremented so no need to insert into that column
        const query = `INSERT INTO goats (name, gender, age, weight, farm, price, image)
                    VALUES (
                        "${req.body.name}", 
                        "${req.body.gender}", 
                        ${req.body.age} , 
                        ${req.body.weight}, 
                        "${req.body.farm}",
                        ${req.body.price} , 
                        "${req.body.image}")`
        await createAndInsertTable(query);
        res.send({ "status": "Success" });
    } catch (e) {
        console.error(e);
        res.send({ "error": e });
    }
})

module.exports = router;