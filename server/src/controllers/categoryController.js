const createHttpError = require("http-errors")
const Slugify = require('slugify')
const { successRespnse } = require("./responseController");
const Category = require("../models/categoryModel");
 

const handelCreateCategory =async(req,res,next)=>{
  try {
     const {name} = req.body;

     console.log(Slugify(name))
     const newCategory = await Category.create({
      name:name,
      slug: Slugify(name)
     })
    return successRespnse(res,{statusCode:201,message:'category was created',payload:{newCategory}})
  } catch (error) {
    next(createHttpError(404,error.message))
  }
}

module.exports  = {handelCreateCategory}