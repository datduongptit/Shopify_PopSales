const express = require('express');
const router = express.Router();
const conn = require('../../config/db');
const {check, validationResult} = require('express-validator');

// CREATE Notification Setting
router.post('/', async(req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }
    const {
        showOrder,
        selectOrder,
        customShow,
        numberOfLive,
        orderStatus,
        nextTimeDisplay,
        displaytime,
        dateFormat,
        showDevices,
        customText,
        notiDisplay,
        notiHidden,
        position,
        highlightColor,
        textColor,
        colorDate,
        borderRadius
    } = req.body;
    var b=[]
    const notiFields = {};
    if(showOrder) notiFields.showOrder = showOrder;
    if(selectOrder) notiFields.selectOrder = selectOrder;
    if(customShow) notiFields.customShow = customShow;
    if(numberOfLive) notiFields.numberOfLive = numberOfLive;
    if(orderStatus) notiFields.orderStatus = orderStatus;
    if(nextTimeDisplay) notiFields.nextTimeDisplay = nextTimeDisplay;
    if(displaytime) notiFields.displaytime = displaytime;
    if(dateFormat) notiFields.dateFormat = dateFormat;
    if(showDevices) notiFields.showDevices = showDevices;
    if(customText) notiFields.customText = customText;
    if(notiDisplay) notiFields.notiDisplay = notiDisplay;
    if(notiHidden) notiFields.notiHidden = notiHidden;
    if(position) notiFields.position = position;
    if(highlightColor) notiFields.highlightColor = highlightColor;
    if(textColor) notiFields.textColor = textColor;
    if(colorDate) notiFields.colorDate = colorDate;
    if(borderRadius) notiFields.borderRadius = borderRadius;
    // if (orderStatus) {
    //     notiFields.orderStatus = orderStatus.split(',').map((item) => item.trim());
    //   }
    try {
        conn.query('SELECT * FROM notificationsetting', (error, results, fields) => {
            if (error) throw error;
            if(results.length === 0) {
                conn.query("INSERT INTO notificationsetting SET ?", notiFields , async function (error, results, fields) {
                    if (error) throw error;
                    return await res.send({ error: false, data: results, message: 'Created' });
                });
            };
            conn.query("UPDATE notificationsetting SET ? WHERE 1", notiFields , async function (error, results, fields) {
                if (error) throw error;
                return await res.send(notiFields);
            });
        })
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error') 
    }
});

// GET Notification
router.get('/', async (req, res) => {
    try {
        conn.query('SELECT * FROM notificationsetting', (error, results, fields) => {
            if (error) throw error;
            return res.send(results);
        })
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
})

module.exports = router;