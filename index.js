const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');

const PORT = 5000;

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(__dirname + '/public/'));

const auth = require('./routes/auth');
app.use('/auth', auth);

const goat = require('./routes/goat');
app.use('/goat', goat);

app.get('/cart', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/cart.html'));
})

app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}`);
});