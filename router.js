const API = require('./api/middleware/apikey');

// Import routes
const accountGroupRoutes = require('./api/routes/accountgroup.router');
const accountRoutes = require('./api/routes/account.router');
const itemGroupRoutes = require('./api/routes/itemgroup.router');
const itemRoutes = require('./api/routes/item.router');
const vendorRoutes = require('./api/routes/vendor.router');
const vendorDetailsRoutes = require('./api/routes/vendordetails.router');
const salesInfoRoutes = require('./api/routes/salesinfo.router');
const purchaseInfoRoutes = require('./api/routes/purchaseinfo.router');
const inventoryMasterRoutes = require('./api/routes/inventorymaster.router');
const inventoryStoreRoutes = require('./api/routes/inventorystore.router');

module.exports = (app) => {

    // Routes Middlewares
    app.use('/accountgroup', API.validateKey, accountGroupRoutes);
    app.use('/account', API.validateKey, accountRoutes);
    app.use('/itemgroup', API.validateKey, itemGroupRoutes);
    app.use('/item', API.validateKey, itemRoutes);
    app.use('/vendor', API.validateKey, vendorRoutes);
    app.use('/vendordetails', API.validateKey, vendorDetailsRoutes);
    app.use('/salesinfo', API.validateKey, salesInfoRoutes);
    app.use('/purchaseinfo', API.validateKey, purchaseInfoRoutes);
    app.use('/inventorymaster', API.validateKey, inventoryMasterRoutes);
    app.use('/inventorystore', API.validateKey, inventoryStoreRoutes);

}