const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public/'));

const auth = require('./routes/auth');
app.use('/auth', auth);

const goat = require('./routes/goat');
app.use('/goat', goat);

app.listen(5000, () => {
    console.log("Listening at http://localhost:5000");
});