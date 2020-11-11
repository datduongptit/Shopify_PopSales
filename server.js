const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
const conn = require('./config/db');

const app = express();

const PORT = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.use('/api/manualSale', require('./routes/apis/manualSale'));
app.use('/api/notificationsetting', require('./routes/apis/notificationSetting'));
app.use('/api/realtime_setting', require('./routes/apis/realtimeSetting'));

app.get('/', (req, res) => {
    res.send("Hello world")
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})
