const mongoose=require("mongoose");
const authenticationschema=new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:["superadmin","admin"]
    },
    username:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:["active","inactive","paused"]
    }
})
module.exports=authenticationschema