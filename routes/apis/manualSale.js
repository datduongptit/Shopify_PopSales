const express = require('express');
const router = express.Router();
const conn = require('../../config/db');
const {check, validationResult} = require('express-validator');

// GET all Manual Sales
router.get('/', async (req, res) => {
    conn.query('SELECT * FROM manualsales',async function (error, results, fields) {
        if (error) throw error;
        return await res.send(results);
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
        return res.send(results);
    });

});

//POST Create a new Manual Sales
router.post('/', [
    check('firstName', 'Firstname is required').not().isEmpty(),
    check('lastName', 'Lastname is required').not().isEmpty(),
    check('city', 'City is required').not().isEmpty(),
    check('product', 'Product is required').not().isEmpty()
], async (req, res) => {
    const errors = validationResult(req, res);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }
    const {firstName, lastName, city, product, order, publishOrder} = req.body;
    try {   
        conn.query(`INSERT INTO manualsales SET ?`, { firstName: firstName, lastName: lastName, city: city, product: product, order: order, publishOrder: publishOrder }, async (error, results, fields) => {
            if (error) throw error;
            return await res.send({ firstName: firstName, lastName: lastName, city: city, product: product, order: order, publishOrder: Number(publishOrder)});
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

    let manualFeilds = {};
    if(firstName) manualFeilds.firstName = firstName;
    if(lastName) manualFeilds.lastName = lastName;
    if(city) manualFeilds.city = city;
    if(publishOrder) manualFeilds.publishOrder = publishOrder;
    if(product) manualFeilds.product = product;
    if(order) manualFeilds.order = order;

    try {
        conn.query(`UPDATE manualsales SET ? WHERE id = ${id}`, manualFeilds, function (error, results, fields) {
            if (error) throw error;
            return res.send(results);
        })
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
});

// Update publish order 
router.put('/publishOrder/:id', async (req, res) => {
    try {
        const id = req.params.id
        const publishOrder = req.body;
        conn.query(`UPDATE manualsales SET ? WHERE id = ${id}`, publishOrder, (error, results, fields) => {
            if(error) throw error;
            return res.send(results)
        })
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
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