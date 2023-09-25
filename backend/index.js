const express=require("express")
const app=express()
require('dotenv').config()
const cors=require('cors')

const menuroute=require('./routes/MenuRoute')
const orderroute=require('./routes/OrderRoute')

require('./database/connection')
port=process.env.PORT || 8001
app.listen(port,()=>{
    console.log(`server started at ${port}`)
})

app.use(express.json())
app.use(cors())
app.use('/menu',menuroute)
app.use("/order",orderroute)
