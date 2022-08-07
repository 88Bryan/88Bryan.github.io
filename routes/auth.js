const express = require('express');
const router = express.Router();
const { selectQuery } = require('../db/database');

router.post('/', async(req, res) => {
    let { email, password } = req.body;
    let query = `SELECT name, email, password
                FROM user
                WHERE email = "${email}"
                AND password = "${password}"`;
    const result = await selectQuery(query);
    res.send(result);
})

module.exports = router;