let mongoose=require('mongoose')

let orderitemSchema=new mongoose.Schema({
    food_name:{
        type:String,
        required:true
    },
    food_price:{
        type:Number,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    }
},{timestamps:true})
module.exports=mongoose.model("OrderItem",orderitemSchema)