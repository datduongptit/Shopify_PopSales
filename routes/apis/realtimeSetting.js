const express = require('express');
const router = express.Router();
const conn = require('../../config/db');
const {check, validationResult} = require('express-validator');

// GET realtimeSetting
router.get('/', async (req, res) => {
    try {
        conn.query('SELECT * FROM realtime_setting', (error, results, fields) => {
            if (error) throw error;
            return res.send(results)
        })
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// POST & UPDATE realtimeSetting
router.post('/', async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    };

    const {
        show_product,
        background_left,
        background_right,
        background_color,
        random_from,
        random_to,
        custom_text,
        color_text,
        position
    } = req.body;

    // build ReatimeSettings object
    const realtimeFields = {};
    if(show_product) realtimeFields.show_product = show_product;
    if(background_left) realtimeFields.background_left = background_left;
    if(background_right) realtimeFields.background_right = background_right;
    if(background_color) realtimeFields.background_color = background_color;
    if(custom_text) realtimeFields.custom_text = custom_text;
    if(color_text) realtimeFields.color_text = color_text;
    if(position) realtimeFields.position = position;
    if(random_from) realtimeFields.random_from = random_from;
    if(random_to) realtimeFields.random_to = random_to;
    try {
        conn.query('SELECT * FROM realtime_setting', (error, results, fields) => {
            if (error) throw error
            if(results.length === 0) {
                conn.query('INSERT INTO realtime_setting SET ?', realtimeFields, async (error, results, fields) => {
                    if(error) throw error;
                    return await res.send(results)
                });
            };
            conn.query('UPDATE realtime_setting SET ? WHERE 1', realtimeFields, (error, results, fields) => {
                if(error) throw error;
                return res.send(realtimeFields);
            });
        })
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error'); 
    }
})

module.exports = router;