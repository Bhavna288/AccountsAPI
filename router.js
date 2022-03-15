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
const customerRoutes = require('./api/routes/customer.router');
const customerDetailsRoutes = require('./api/routes/customerdetails.router');
const salesOrderRoutes = require('./api/routes/salesorder.router');
const itemsInOrderRoutes = require('./api/routes/itemsinorder.router');
const invoiceRoutes = require('./api/routes/invoice.router');
const purchaseOrderRoutes = require('./api/routes/purchaseorder.router');
const itemsInPurchaseRoutes = require('./api/routes/itemsinpurchase.router');
const billRoutes = require('./api/routes/bill.router');
const paymentRoutes = require('./api/routes/payment.router');
const vendorPaymentRoutes = require('./api/routes/vendorpayment.router');


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
    app.use('/customer', API.validateKey, customerRoutes);
    app.use('/customerdetails', API.validateKey, customerDetailsRoutes);
    app.use('/salesorder', API.validateKey, salesOrderRoutes);
    app.use('/itemsinorder', API.validateKey, itemsInOrderRoutes);
    app.use('/invoice', API.validateKey, invoiceRoutes);
    app.use('/purchaseorder', API.validateKey, purchaseOrderRoutes);
    app.use('/itemsinpurchase', API.validateKey, itemsInPurchaseRoutes);
    app.use('/bill', API.validateKey, billRoutes);
    app.use('/payment', API.validateKey, paymentRoutes);
    app.use('/vendorpayment', API.validateKey, vendorPaymentRoutes);

}