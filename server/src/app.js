const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const createError = require('http-errors')
const rateLimit = require('express-rate-limit')
const xss = require('xss-clean')
const userRouter = require('./routes/userRouter')
const seedRouter = require('./routes/seedRoute')
const { errorResponse } = require('./controllers/responseController')
const authRouters = require('./routes/authRouter')
const categorRouters = require('./routes/categoryRouter')
const cookieParser = require('cookie-parser')
const productRouter = require('./routes/productRouter')

const app = express()
const rateLimiter = rateLimit({
  windowMs : 60*1000,
  max: 10,  // max 3 request pare
  message: 'Too many requests from this ip .please try again leter'
})
app.use(cookieParser())
app.use(morgan('dev'))
app.use(rateLimiter)
app.use(xss())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))



// making a router from crate router
app.use('/api/users',userRouter)
app.use('/api/seed',seedRouter)
app.use('/api/auth',authRouters)
app.use('/api/categories',categorRouters)
app.use('/api/products',productRouter)
//app test
 app.get('/test',(req,res)=>{
  res.status(200).json({message:'i am testing parpes'})
 })

 app.get('/error',(req,res,next)=>{
  const notFoundError = createError(404, 'Resource not found');
  
  // Pass the error to the next middleware
  next(notFoundError);
 })
//clint error handling
app.use((req,res,next)=>{
  res.status(404).json({message: 'Rount not found'})
  next()
})
 


app.use((err,req,res,next)=>{
   // Handle errors
  //  return res.status(err.status || 500).json({
  //   success:false,
  //   message: err.message
  //  })
  // convert the function 
   return errorResponse(res,{statusCode:err.status,message:err.message})
    
}) 
module.exports = app
