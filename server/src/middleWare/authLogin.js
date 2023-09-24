const createHttpError = require("http-errors");
const jwt = require('jsonwebtoken');
const { JWT_ACCESS } = require("../secret");

const isLoggedIn = async(req,res,next)=>{
  try {
     const token = req.cookies.access_token;
     console.log(token)
    //  console.log(token)
      if(!token){
        next(createHttpError(404,'User not found '))
      } 
      const decoded = jwt.verify(token,JWT_ACCESS)
      console.log(decoded)
      if(!decoded)
      {
        next(createHttpError(404,'invalid token '))
      }
    
        req.user = decoded.userWithourPass
        
       next()
  } catch (error) {
    next(createHttpError(404,error.message))
  }
}
const isLoggedOut =async(req,res,next)=>{
  try {
    const token = req.cookies.access_token;
    if(token){
      next(createHttpError(400,'user is already logged in'))
    }
    next()
  } catch (error) {
    next(createHttpError(400,error.message))
  }
}
const isAdminn = async(req,res,next)=>{
  try {
     const isaddmin = req.user
      
      
     console.log(isaddmin && isaddmin.isAdmin)
    if(isaddmin && isaddmin.isAdmin){
      next()
      return
    }
     next(createHttpError(400,'you are not addmin'))
  } catch (error) {
    next(createHttpError(400,error.message))
  }
}

module.exports = {isLoggedIn,isLoggedOut,isAdminn}  