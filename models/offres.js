const mongoose=require('mongoose');

const Schema=mongoose.Schema;

//creating schema for user's offre 

const Offreschema=new Schema({

    jobTitle:{
        type: String,

    },
    company:{
        type: String
    },
    location:{
        type:String
    },
    Yexperience:{
        type:Number,
        
    },
    skills:{
        type: String,
        
    },
    
    
})

module.exports=offres=mongoose.model('offres',Offreschema);