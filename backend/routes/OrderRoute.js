const express=require("express")
const { placeOrder, printBill, updateBill } = require("../controller/OrderController")
const router=express.Router()

router.post("/placeorder",placeOrder)
router.get("/printbill/:table",printBill)
router.put("/updatebill/:table",updateBill)

module.exports=router
