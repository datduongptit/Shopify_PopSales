const express = require('express');
const router = express.Router();
const conn = require('../../config/db');
const {check, validationResult} = require('express-validator');
// const Sequelize = require('sequelize')
// const ManualSale = require('../../model/ManualSale');


// GET all Manual Sales
router.get('/', async (req, res) => {
    conn.query('SELECT * FROM manualsales', function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'manualsales list.' });
    });
    
});

// GET Manual Sales by ID
router.get('/:id', async (req, res) => {

    let id = req.params.id;

    if (!id) {
        return res.status(400).send({ error: true, message: 'Please provide id' });
    }

    conn.query('SELECT * FROM manualsales where id=?', id, function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results[0], message: 'users list.' });
    });

});

//POST Create a new Manual Sales
router.post('/', [
    check('firstName', 'Firstname is required').not().isEmpty(),
    check('lastName', 'Lastname is required').not().isEmpty(),
    check('city', 'City is required').not().isEmpty(),
    // check('publishOrder', 'PublishOrder is required').not().isEmpty(),
    check('product', 'Product is required').not().isEmpty()
], async (req, res) => {
    const errors = validationResult(req, res);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }
    const {firstName, lastName, city, product, order, publishOrder} = req.body;
    try {   
        conn.query(`INSERT INTO manualsales SET ?`, { firstName: firstName, lastName: lastName, city: city, product: product, order: order, publishOrder: publishOrder}, async function (error, results, fields) {
            if (error) throw error;
            return await res.send({ error: false, data: results, message: 'New user has been created successfully.' });
        });      
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
});

// UPDATE Manual Sales by ID
router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const {firstName, lastName, city, product, order, publishOrder} = req.body;
    try {
        conn.query(`UPDATE manualsales SET ? WHERE id = ${id}`, {firstName: firstName, lastName: lastName, city: city, product: product, order: order, publishOrder: publishOrder}, function (error, results, fields) {
            if (error) throw error;
            return res.send({ error: false, data: results, message: 'Update successfully' });
        })
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
})

// DELETE Manual Sales
router.delete('/:id', async (req, res) => {
    const id = req.params.id
    try {
        conn.query(`DELETE FROM manualsales WHERE id = ${id}`,[id], function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'Delete successfully' });
        })
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
})


module.exports = router;