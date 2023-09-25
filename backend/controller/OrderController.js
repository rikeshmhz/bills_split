let Order = require('../model/OrderModel')
let OrderItems = require('../model/OrderItems')

exports.placeOrder = async (req, res) => {
    try {
        let orderItemsIds = await Promise.all(req.body.orderItems.map(async orderItem => {
            let orderItemtosave = new OrderItems({
                food_name: orderItem.food_name,
                food_price: orderItem.food_price,
                quantity: orderItem.quantity
            })
            orderItemtosave = await orderItemtosave.save()
            if (!orderItemtosave) {
                return res.status(400).json({ error: "Failed to place order" })
            }
            return orderItemtosave._id

        }))
        let ordertoplace = new Order({
            orderItems: orderItemsIds,
            name: req.body.name,
            total: req.body.total,
            table: req.body.table
        })
        ordertoplace = await ordertoplace.save()
        if (!ordertoplace) {
            return res.status(400).json({ error: "Failed to place order" })
        }
        res.send(ordertoplace)
    } catch (error) {
        console.log(error)
    }
}

exports.printBill = async (req, res) => {
    try {
        let table = req.params.table
        let bill = await Order.find({ $and: [{ status: "Pending" }, { table: table }] })
        if (!bill) {
            return res.status(400).json({ error: "Something went wrong" })
        }
        return res.send(bill)
    } catch (error) {
        console.log(error)
    }
}

exports.updateBill = async (req, res) => {
    try {
        let tablenum = req.params.table
        const table = { table: tablenum }
        const update = { $set: { status: "Payed" } }
        let bill = await Order.updateMany(table, update)
        if (!bill) {
            return res.status(400).json({ error: "Something went wrong" })
        }
        return res.send(bill)
    } catch (error) {
        console.log(error)
    }
}