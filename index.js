const express = require('express');
const app = express();
const db = require('./db/connect');
const path = require('path');
const bodyParser = require('body-parser')
const expressValidator = require('express-validator')

require('dotenv').config();
const port = process.env.PORT || 3000;

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use(express.static('public'))

const mongoDBUrl = process.env.MONGODB_URI;
db.connection(mongoDBUrl);

// routes
var userRoute = require('./routes/user');

app.get('/', (req, res) => {
    res.send("MAIN PAGE");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: 'application/*+json' }));
app.use(bodyParser.raw({ type: 'application/vnd.api+json' }));
app.use(bodyParser.text({ type: 'text/html' }));


app.use('/', userRoute);
app.use(function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}.`)
});