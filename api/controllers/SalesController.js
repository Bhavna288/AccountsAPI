const Sales = require('../models/Sales');

module.exports = {
    getSales: async (req, res) => {
        try {
            const sales = await Sales.find()
                .populate("client")
                .populate("items.itemId");
            res.json(sales);
        } catch (error) {
            console.log(error);
            res.status(400).send(error);
        }
    },
    getSalesById: async (req, res) => {
        try {
            const sales = await Sales.findById(req.params.salesId)
                .populate("client")
                .populate("items.itemId");
            res.json(sales);
        } catch (error) {
            res.status(400).send(error);
        }
    },
    getSalesByClient: async (req, res) => {
        try {
            const sales = await Sales.find({ "client": req.params.clientId })
                .populate("client")
                .populate("items.itemId");

            res.json(sales);
        } catch (error) {
            res.status(400).send(error);
        }
    },
    createSale: async (req, res) => {

        var tp = 0;
        req.body.items.forEach(element => {
            element["totalPrice"] = element.quantity * element.price;
            tp += element["totalPrice"];
        });

        const sales = new Sales({
            client: req.body.client,
            items: req.body.items,
            description: req.body.description,
            totalPrice: tp,
            date: req.body.date,
            paid: req.body.paid,
            remaining: req.body.remaining
        });

        var date = new Date();
        // console.log(date.toString());

        try {
            const savedSale = await sales.save()
            // res.json(savedSale);
            res.json({ salesId: sales._id });
        } catch (err) {
            res.status(400).send(err);
        }
    },
    updateSale: async (req, res) => {
        try {
            const updatedSale = await Sales.updateOne(
                { _id: req.params.salesId },
                {
                    $set: {
                        client: req.body.client,
                        items: req.body.items,
                        receiptNo: req.body.receiptNo,
                        description: req.body.description,
                        totalPrice: req.body.totalPrice,
                        date: req.body.date,
                        paid: req.body.paid,
                        remaining: req.body.remaining
                    }
                }
            );
            res.json(updatedSale);
        } catch (error) {
            res.status(400).send(error);
        }
    },
    deleteSale: async (req, res) => {
        try {
            const removedSale = await Sales.remove({ _id: req.params.salesId });
            res.json(removedSale);
        } catch (error) {
            res.status(400).send(error);
        }
    }
}