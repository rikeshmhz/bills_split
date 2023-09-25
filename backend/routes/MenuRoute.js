const express=require("express")
const { addtomenu, getmenu, getmenudetails } = require("../controller/MenuController")
const router=express.Router()

router.post('/addmenu',addtomenu)
router.get('/getmenu',getmenu)
router.get('/getmenudetails/:id',getmenudetails)

module.exports=router