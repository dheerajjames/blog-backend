const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = require("./app")

dotenv.config({path:"./config.env"});

mongoose.connect(process.env.DB_LOCAL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then((connection)=>{
    console.log("Successfully connected to db");
})
.catch((err=>{
    console.log("Error in connection",err)
    
}))

app.listen(process.env.PORT,()=>{
    console.log(`App started at port ${process.env.PORT}`)
})