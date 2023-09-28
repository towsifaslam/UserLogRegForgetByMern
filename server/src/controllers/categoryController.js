const createHttpError = require("http-errors")
const Slugify = require('slugify')
const { successRespnse } = require("./responseController");
const { createCategory,deleteCategory, getCategories,getCategory, updateCategory } = require("../services/categoriService");
  
const handelCreateCategory =async(req,res,next)=>{
  try {
     const {name} = req.body;

 
     const newCategory =  await createCategory(name)
    return successRespnse(res,{statusCode:201,message:'category was created',payload:{newCategory}})
  } catch (error) {
    next(createHttpError(404,error.message))
  }
}

const handleGetCtegories = async (req,res,next)=>{
  try {
    const getAllCategory = await getCategories()
    successRespnse(res,{statusCode:202,message:'get all category',payload:{getAllCategory}})
    
  } catch (error) {
    next(createHttpError(404,error.message))
  }
}
const handleGetCategory = async(req,res,next)=>{
  try {
    const {slug} = req.params;
     const items =await getCategory(slug)
   successRespnse(res,{statusCode:202,message:'this is your item',payload:{items}})
  } catch (error) {
    
  }
}
const handleUpdateCategoyr =async(req,res,next)=>{
  try {
    const {slug} = req.params;
    const {name} = req.body;
    console.log(name,slug)
    const updates =await updateCategory(name,slug)

  return  successRespnse(res,{statusCode:202,message:'category was updated ',payload:{updates}})
  } catch (error) {
    next(createCategory(404,error.message))
  }
}
const handleDeletedCategory = async(req,res,next)=>{
  try {
    const {slug} = req.params;
    
   const result =  await deleteCategory(slug)
   
   if(!result){
 
    next(createCategory(404,'no category found with sludg'))
  }
    successRespnse(res,{statusCode:202,message:'categroy was deleted'})
  } catch (error) {
     
    next(createCategory(404,error.message))
    
  }
}

module.exports  = {handelCreateCategory,handleDeletedCategory,handleGetCtegories,handleGetCategory,handleUpdateCategoyr}