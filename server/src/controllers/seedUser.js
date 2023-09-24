const createHttpError = require("http-errors")
const User = require("../models/usersModel")
const data = require("../../data")

const seedGetAllUser = async(req,res,next)=>{
  try {
     await User.deleteMany({})
     const user = await User.insertMany(data.users)

     res.status(201).json({message:'All users',user})

  } catch (error) {
    next(createHttpError(400,'User not found'))
  }
}
module.exports={
   seedGetAllUser
}

