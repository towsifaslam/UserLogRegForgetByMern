const errorResponse =(res,{statusCode = 500, message='internal server error'})=>{
  res.status(statusCode).json({
    success:false,
    message:message 
  
  })
}
const successRespnse =(res,{statusCode=201,message='success',payload={}})=>{
  res.status(statusCode).json({
    success:true,
    message:message,
    payload:payload
  })
}


module.exports = {errorResponse,successRespnse}