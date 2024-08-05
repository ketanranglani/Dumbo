const mongoose = require('mongoose')
mongoose.set('strictQuery', false)



const userSchema=new mongoose.Schema({
    username:{
        type:String,
        unique:true
    },
    password:{
        type:String
    },
    name:String,
    blogs:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog'
    }]
})
userSchema.set('toJSON',{
    transform:(document,
        returnObj
    )=>{
        returnObj.id=returnObj._id.toString()
        delete returnObj._id;
        delete returnObj._v;
        delete returnObj.password;
    }
})

const User = mongoose.model('User',userSchema)
module.exports = User