const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const CompanySchema=new Schema({
    name:{
        type:String,
        default:''
    },   
    city:{
        type:String,
        default:''
    },   
    logo:{
        type:String,
        default:''
    }, 
    link:{
        type:String,
        default:''
    },
    email:{
        type:String,
        default:''
    }
})

const Company=mongoose.model("Company", CompanySchema);
module.exports=Company;
