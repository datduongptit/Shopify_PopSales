

// const conn = require('../config/dv/config');

// const ManualSale = (manualSale) => {
//     this.firstname = manualSale.firstname;
//     this.lastname = manualSale.lastname;
//     this.city = manualSale.city;
//     this.product = manualSale.product;
//     this.order = manualSale.order;
// };

// module.exports = ManualSale

module.exports = (sequelize, type) => {
    return sequelize.define('manualSale', {
        firstName: type.String,
        lastName: type.String,
        city: type.String,
        product: type.String,
        order: type.String,
        publishOrder: type.Boolean
    })
}