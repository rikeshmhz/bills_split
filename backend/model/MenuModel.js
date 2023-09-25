const mongoose=require('mongoose')

const foodSchema=new mongoose.Schema({
    food_name:{
        type:String,
        required:true,
        trim:true
    },
    food_price:{
        type:Number,
        required:true
    }
},{timestamps:true})
module.exports=mongoose.model("Food",foodSchema)