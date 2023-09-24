 const {Schema,model} = require('mongoose')
const bcrypt = require('bcryptjs')
const {defaultImagePath} = require('../secret')
 const userSchema = Schema({
  name:{
    type: String,
    required:[true,'Enter you name'],
    minlength:[3,'Minimum length of 2 characters'],
    maxlength:[20,'miximamum length of 20 characters'],
    trim:true
  },
  email:{
    type:String,
    required:[true,'Email is requeired'],
    unique:true,
    lowercase:true,
    trim:true,
    validate:{
      validator:(value)=>{
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailRegex.test(value)
      },
      message: 'invalid email formate'
    }
    
  },
  password:{
    type:String,
    required:[true,'Password is requeired'],
    minlength:[6,'minimum password 6'],
    set:(v) => bcrypt.hashSync(v,bcrypt.genSaltSync(10))     
  },
  image:{
    type:String,
    default:defaultImagePath
  },
  address:{
    type:String,
    required:[true, 'User address is r equired']
  },
  phone:{
    type:String,
    required:[true,'User phone is required']
  },
  isAdmin:{
    type:Boolean,
    default: false
  },
  isBanned:{
    type: Boolean,
    default :false
  }
 },{timestamps:true})


 const User = model('users',userSchema)

 module.exports = User