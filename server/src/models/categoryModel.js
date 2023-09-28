const {Schema,model} = require('mongoose')


const CategorSchema = new Schema({
 name:{
  type:String,
  required:[true,'category name is required'],
  trime:true,
  unique:true,
  minLength:[3,'The length of category name can be minimum 3 character']
  

 },
 slug:{
   type:String,
   required:[true,'Category slug is required'],
   lowercase:true,
  unique:[true,'Category must be unique'],

 }
},{timestamps:true})

const Category = model('Category',CategorSchema);
module.exports = Category