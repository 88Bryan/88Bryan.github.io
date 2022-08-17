const express = require('express');
const router = express.Router();
const { selectQuery } = require('../db/database');
const cheerio = require("cheerio");
const fs = require("fs");
const https = require("https");
const httpMsgs = require("http-msgs")

var db = require('../db/database')

router.post('/', async(req, res) => {
    let { email, password } = req.body;
    let query = `SELECT name, email, password
                FROM user
                WHERE email = "${email}"
                AND password = "${password}"`;
    const result = await selectQuery(query);
    if(result == ""){
        console.log("fail")
        fs.readFile('./public/index.html', "utf8", function(err, data) {
            if (err) throw err;
                var $ = cheerio.load(data);
                $("#signinError").text("email already exist");
                res.send($.html());
          });
    }
    else{
        console.log("success")
        res.redirect("/");
    }


})

router.post('/signup', async(req, res) => {
    var data = {
            firstname: req.body.fName,
            lastname: req.body.lName,
            email: req.body.email,
            password : req.body.pass,
    }
    var sql ='INSERT INTO user (name, email, password) VALUES ("' + String(data.firstname) + " " + String(data.lastname) + '","' + String(data.email) + '","' + String(data.password) + '")';

    const result = await db.createAndInsertTable(sql);

        if(result === undefined){
            res.redirect('/');
        }
        else{
            console.log("error");
            fs.readFile('./public/signup.html', "utf8", function(err, data) {
                if (err) throw err;

                var $ = cheerio.load(data);

                $("#signupError").text("email already exist");
                res.send($.html());
              });
        }
})

//router.post('/signup', function(req, res){
//    var data = req.body;
//    console.log(data);
//
//    httpMsgs.sendJSON(req, res, {
//        from : "Server"
//    })
//})


module.exports = router;