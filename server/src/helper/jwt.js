
const createHttpError = require('http-errors')
const jwt = require('jsonwebtoken')

 
const createJsonWebToken=(payload,secretKye,expiresIn)=>{

  if(typeof payload !== 'object' || !payload){
    throw createHttpError(400 , 'playload must be a non-empty object') }
    if(typeof secretKye !== 'string' || !secretKye){
      throw createHttpError(400 , 'scerect key must be a non-empty string')
    }
 try {
  const token = jwt.sign(payload,secretKye,{expiresIn})
  return token
 } catch (error) {
   console.log(error)
 }
}
module.exports = createJsonWebToken;