const createHttpError = require("http-errors")
const User = require("../models/usersModel");
 
const {secretKye,client_url, smtpUsername, smtpPassword,JWT_Forget} = require('../secret')
 
const jwt =require('jsonwebtoken')

const { successRespnse, errorResponse } = require("./responseController");
const { default: mongoose } = require("mongoose");
const { findById } = require("../services/findByID");
 
const deleteImage = require("../helper/deleteImage");
const createJsonWebToken = require("../helper/jwt");
const emailWithNodeMailer = require("../helper/email");
const runValidation = require('../middleWare/index');
const bcrypt = require('bcryptjs')


const getUsers =async(req,res,next)=>{
  try {
     const search = req.query.search || ''
     const page = Number(req.query.page) || 1;
     const limit = Number(req.query.limit) || 5;
     const searchRegExp = new RegExp('.*' + search +'.*','i')
     const filter = {
      isAdmin:{$ne: true},$or:[{name:{$regex:searchRegExp}},{email:{$regex:searchRegExp}},{phone:{$regex:searchRegExp}}]
       
     }
     const users = await User.find(filter).select(['-password']).limit(limit).skip((page-1) * limit)
     if(!users) throw createHttpError(404,'no uses found')
     const count = await User.find(filter).countDocuments();
    const totalPage = Math.ceil(count/limit)
    //  res.status(200).send({
    //   message: 'user were returned',
    //   users,
    //   count,
    //   pagination:{
    //     totalPage,
    //     currentiPage: page,
    //     previousPage: page -1>0 ?  page-1 : null,
    //     nextPage:  page+1 <= Math.ceil(count/limit) ? page+1:null
    //   }
      
    //  })
    return successRespnse(res,{statusCode:200,message:'user were returned',payload:{
      users,
      count,
      pagination:{
        totalPage,
        currentPage:page,
        previousPage: page-1 > 0 ? page-1:null,
        nextPage: page+1 <= Math.ceil(count/limit) ?page+1:null
      }
    }})
  } catch (error) {
    next(createHttpError(400,'user not found'))
    
  }
}
const getUserById = async(req,res,next)=>{

  try {
    // console.log("kkkkkkkkk")
    // console.log(req.user)
    // const user = await User.findById(req.params.id).select('-password');
    // if(!user){
    //    throw createHttpError(404,'user not foaund')
    const id = req.params.id;
    const option = {password:0}
  const user = await findById(User,id,option)
 
 
    successRespnse(res,{statusCode:200,message:`user ${user.name}`,payload:{user}})
  } catch (error) {
    
    next(error)
  } 
} 
const deleteUserId = async(req,res,next)=>{
  try {
    const id = req.params.id;
      const option = {password:0}
      const user =await findById(User,id,option)
 

      const userImagePath = user.image;
       await deleteImage(userImagePath)
       
       
     
      await User.findByIdAndRemove({_id:id,isAdmin:false})


     
    return successRespnse(res,{statusCode:201,message:'useer delete succefully',payload:{user}})
  } catch (error) {
    if(error instanceof mongoose.Error){ 
      createHttpError(404,'invalid user please try again')        
    }
    
  }
}
const proccessRegister = async(req,res,next)=>{
  const {name,email,password,phone,address} = req.body
  
  try { 

 
    
    // if(!name || !email || !password || !phone || !address )
    // {
    //   return createHttpError(400,'please fill all this')
    // }
    // const exist = User.findOne(email)
    // if(exist){
    //   return createHttpError(400,'email already exist , please login')
    // }
    // console.log(exist)
    // const hashedPassword = await bcrypt.hashSync(password,bcrypt.genSaltSync(10))
    // const user = await User.save({name,email,phone,password:hashedPassword,address})
    // console.log(user)
    const newUser = {
      name,email,password,phone,address
    }
    const existingUser=await User.findOne({email})

    if(existingUser){
      throw createHttpError(404,'user alredy existis')
    } 
 
const token =  await createJsonWebToken(newUser,secretKye,'1h')
const emailData = {
  email,
  subject: 'Account active email',
  html:`
    <h2>hellow ${name} </h2>
    <p>Please click here to <a href="${client_url}/api/users/activate/${token}" target="_blank">active your account</a></p>

  `
}

// tranporter create for nodemailer email 
 try {
   await emailWithNodeMailer(emailData)
 } catch (error) {
  next(createHttpError(404,"does not email"))
 }
 
successRespnse(res,{statusCode:200,message:`check your email ${email}`,payload:{token}})
  } catch (error) {  
    next(createHttpError(500,'faild to send verification'))
    return;
  }
}
const activateUserAccount =async(req,res,next)=>{
try {
  const token = req.body.token
  if(!token) throw createHttpError(404,'token  is empyty')

 const decoded =   jwt.verify(token,secretKye)
 const existedUser = await User.exists({email:decoded.email})
 if(existedUser){
  next(createHttpError('email alredy exist please trye agin'))
 }
 const newUser = await User.create(decoded)
  return successRespnse(res,{statusCode:201,message:'your varified',payload:{newUser}})
} catch (error) {
   if(error.name === 'TokenExpiredError'){
    next( createHttpError(401,'Token has expired'))
   }
   else if(error.name === 'JsonWebTokenError'){
   next(  createHttpError(401,'invalid token'))
   }else{
       return
   }
}

}
const updateUser = async(req,res,next)=>{
 
  try {
     const id = req.params.id;
     const updateOption = {new:true,runValidation:true,context:'query'}
     const updates = {}
     if(req.body.name){
     
      updates.name = req.body.name
     

     }
     if(req.body.password){
      updates.password = req.body.password;
     }
     if(req.body.phone){
      updates.phone = req.body.phone
     }
     if(req.body.address){
      updates.address = req.body.address
     }
     const updateUser = await User.findByIdAndUpdate(id,updates,updateOption) 
     if(!updateUser) {
       next(createHttpError(404,'use with this id does not exist'))
     }
     return successRespnse(res,{statusCode:201,message:'user was update successfull',payload:updates})
  } catch (error) {
    if(error instanceof mongoose.Error){
      next(createHttpError(404,'invalid user'))
    }
  }
}
const handleBanUserById =async(req,res,next)=>{
  try {
     const userId = req.params.id;
     const updateOption = {new:true,runValidation:true,context:'query'}
     const updateUser = await User.findByIdAndUpdate(userId,{isBanned:true},updateOption)
     if(!updateUser){
      next(createHttpError(404,'user not update'))
     }
     successRespnse(res,{statusCode:202,message:'user is banned'})
   return
  } catch (error) {
    next(createHttpError(404,error.message))
    
  }
}
const handleUnBanUserById =async(req,res,next)=>{
  try {
     const userId = req.params.id;
     const updateOption = {new:true,runValidation:true,context:'query'}
     const updateUser = await User.findByIdAndUpdate(userId,{isBanned:false},updateOption)
     if(!updateUser){
      next(createHttpError(404,'user not update'))
     }
     successRespnse(res,{statusCode:202,message:'user is unbanned'})
   return
  } catch (error) {
    next(createHttpError(404,error.message))
    
  }
}
const handleUpdatePassword= async(req,res,next)=>{
  try {
    const userId = req.params.id;

    const {email,oldPassowrd,newPassword,confirmedPassword} = req.body;

  const user = await findById(User,userId)
  if(!(email === user.email || oldPassowrd === user.password || newPassword === confirmedPassword)){
    next(createHttpError(404,'rignt your validation'))
    return
  }


    if(!user){
      next(createHttpError(400,'wrong condition pleas'))
      return
    }
    const comparePassword =await bcrypt.compare(oldPassowrd,user.password);
   
    if(!comparePassword){
      next(createHttpError(404,'old password is not match'))
    }
    
    const newPasswordSetup = await User.findByIdAndUpdate(
      userId,
      {password:newPassword},
      { new: true } // To return the updated document
    )
    if(!newPasswordSetup){
      next(createHttpError(400,'user was not update succeffully'))
    }
    successRespnse(res,{statusCode:201,message:'user update succefully',payload:{ newPasswordSetup}})

    
  } catch (error) {
  
    next(createHttpError(404,error.message))
    
  }
}
const handleForgetPass = async(req,res,next)=>{
  try {
     const {email} = req.body;
     const existingUser=await User.findOne(email)
     if(!existingUser){
      next(createHttpError(404,'user not fond email'))
      return
     }

       const forgetToken =await createJsonWebToken({email},JWT_Forget,'10m')
       if(!forgetToken){
        next(createHttpError(404,'invalid token'))
       }
     
       const emailData = {
        email:existingUser.email,
        subject: 'Account active email',
        html:`
          <h2>hellow ${existingUser.name} </h2>
          <p>Please click here to <a href="${client_url}/api/users/activate/${forgetToken}" target="_blank">active your account</a></p>
      
        `
      }
      
      // tranporter create for nodemailer email 
       try {
         await emailWithNodeMailer(emailData)
       } catch (error) {
        next(createHttpError(404,"does not email"))
       }
       


      successRespnse(res,{statusCode:202,message:'user forget successfully',payload:{forgetToken}})

  } catch (error) {
    next(createHttpError(400,error.message))
  }
} 
module.exports={
  getUsers,
  getUserById,
  deleteUserId,
  proccessRegister,
  activateUserAccount,
  updateUser,
  handleBanUserById,
  handleUnBanUserById,
  handleUpdatePassword,
  handleForgetPass
  
  
}

