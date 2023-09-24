const mongoose = require('mongoose')
const { dbUrl } = require('../secret')


const connectDB = async(option={})=>{
  try {
    await mongoose.connect(dbUrl,option)
    console.log('Connection to DB is successfully establish')
    mongoose.connection.on('error',(errr)=>{
      console.log(`cennection Error ${errr}`)
    })
  } catch (error) {
    console.log('Could not cennetion to db',error.toString())
  }
}

module.exports = connectDB;