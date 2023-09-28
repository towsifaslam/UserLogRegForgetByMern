const createHttpError = require("http-errors")
const Product = require("../models/productModel")
const { successRespnse } = require("./responseController")
const slugify = require('slugify')

const handleCreateProduct = async(req,res,next)=>{
  try {
    console.log(req.body)
    const{name,slug,description,price,quantity,sold,shipping,category,image} = req.body

    const productExists = await Product.exists({name:name,slug:slugify(name),description:description,price:price,quantity:quantity,sold:sold,shipping:shipping,category:category})

    if(productExists){
      next(createHttpError(404,'user with this name already exist'))
    }
    const product = await Product.create({
      name:name,

    })
    return successRespnse(res,{statusCode:200,message:'product was created successfully'})
    
  } catch (error) {
    
  }
}


module.exports = {
  handleCreateProduct
}