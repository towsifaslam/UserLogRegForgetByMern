const createHttpError = require("http-errors")
const User = require("../models/usersModel")
 
const Product = require("../models/productModel")
const {products,data} = require('../../data')
const { successRespnse } = require("./responseController")
const seedGetAllUser = async(req,res,next)=>{
  try {
     await User.deleteMany({})
     const user = await User.insertMany(data.users)

     res.status(201).json({message:'All users',user})

  } catch (error) {
    next(createHttpError(400,'User not found'))
  } 
}
const seedProducts = async(req,res,next)=>{
  try {
    await Product.deleteMany({})
    const product = await Product.insertMany(products);
    successRespnse(res,{statusCode:201,message:'all data',payload:{product}})
  } catch (error) {
    console.log(33)
    next(createHttpError(404,error.message))
  }
}
module.exports={
   seedGetAllUser,
   seedProducts
}

