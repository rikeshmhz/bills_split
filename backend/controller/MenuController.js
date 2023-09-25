const Menu = require('../model/MenuModel')

exports.addtomenu = async (req, res) => {
    try {
        let menu = await Menu.findOne({ food_name: req.body.food_name })
        if (!menu) {
            let menuadd = new Menu({
                food_name: req.body.food_name,
                food_price: req.body.food_price
            })
            menuadd = await menuadd.save()
            if (!menuadd) {
                return res.status(400).json({ error: "Could not add food" })
            }
            return res.send(menuadd)
        }
        return res.status(400).json({ error: "Food exists." })
    } catch (error) {
        console.log(error)
    }
}
exports.getmenu = async (req, res) => {
    try {
        let menu = await Menu.find()
        if (!menu) {
            return res.status(400).json({ error: "Something went wrong" })
        }
        return res.send(menu)
    } catch (error) {
        console.log(error)
    }
}
exports.getmenudetails = async (req, res) => {
    try {
        let menu = await Menu.findById(req.params.id)
        if (!menu) {
            return res.status(400).json({ error: "Something went wrong" })
        }
        res.send(menu)
    } catch (error) {
        console.log(error)
    }
}