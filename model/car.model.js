const mongoose=require('mongoose');

const carSchema=new mongoose.Schema({
    regNo:{
        type:String,
        required:true
    },
    date:{
        type: String,
        required: true
    },
    location:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    img:{
        type:String,
        required:true
    }

})
module.exports=mongoose.model('Car',carSchema);