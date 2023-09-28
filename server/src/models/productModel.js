const {Schema,model} = require('mongoose')
const {defaultImagePath} = require('../secret')

const productSchema = new Schema({
  name:{
    type:String,
    required:[true,'product name is required'],
    trim:true,
    minlength:[3,'the length is product name can be minimum 3 characters'],
    maxlength:[150,'the length of category name can be maximum 150 characters'] 
   },
  slug:{
    type:String,
    required:[true,'Product slug is required'],
    lowercase:true,
   
  },
  description:{
    type:String,
    required:[true,'description is required'],
    trim:true,
    minlength:[3,'the length of product description can be minimum 3 characters']
  },
  price:{
    type:Number,
    required:[true,'product price is requierd'],
    trim:true,
    validate:{
      validator: function(v){
        return v>0;
      },
      message:(props)=>{
        `${props.value} is not a valid price ,price must be greter then zero`
      }
    }
  },
  quantity:{
 type:Number,
 required:[true,'product quantity is required'],
 trim:true,
 validate:{
  validator:(v)=> v>0,
  message:(props)=> `${props.value} is not a valid quantiny number ,quantity must be grater than 0`
 }
 
  },
  
 sold:{
  type:Number,
  required:[true,'sold is required '],
  default:0,
  trim:true,
  validate:{
    validator:(v)=>v>0,
    message:(props)=> `${props.value} is not a valid sold`
  }
 },
 shipping:{
  type:Number,
  default:0, /// shping fre or paid,
 },
 image:{
  type:String,
  default: defaultImagePath
},
category:{
  type: Schema.Types.ObjectId,
  ref: 'Category',
  required:true,
}
},{timestamps:true})

const Product = model('Product',productSchema)

module.exports = Product