const Slugify = require('slugify')

const Category = require('../models/categoryModel')


const createCategory =async (name)=>{
  
   const newCategory = await Category.create({
      name,
      slug: Slugify(name),
     })
     
     return newCategory;
}
const getCategories = async()=>{
 return await Category.find({}).select('name slug').lean();
}
const getCategory = async(slug)=>{
  return await Category.find({slug}).lean()
}
const updateCategory = async(name,slug)=>{
  return await Category.findOneAndUpdate({slug},{$set:{name:name,slug:Slugify(name)}},{new:true})
}
const deleteCategory = async(slug)=>{

 const result =  await Category.findOneAndDelete({slug:slug})

 return result;

}
module.exports={createCategory,deleteCategory,getCategories,getCategory,updateCategory}