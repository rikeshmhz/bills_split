let mongoose=require('mongoose')
let {ObjectId}=mongoose.Schema

let orderSchema=new mongoose.Schema({
    orderItems:[{
        type:ObjectId,
        ref:"OrderItem",
    }],
    name:{
        type:String,
        required:true
    },
    total:{
        type:Number,
        required:true
    },
    table:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        default:"Pending"
    }
},{timestamps:true})
module.exports=mongoose.model("Order",orderSchema)
