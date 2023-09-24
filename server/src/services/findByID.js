const createHttpError = require("http-errors");
const { successRespnse } = require("../controllers/responseController");
const { default: mongoose } = require("mongoose");

const findById = async(Model,id,option={})=>{
 
try {
  const item =await Model.findById(id,option)
  console.log(Model) 
   if(!item){
    throw createHttpError(400,'item not found');

    
   }
    return item
   
} catch (error) {
  if(error instanceof mongoose.Error){
    createHttpError(404,'invalid user please try again')        
    }
  
}  
}

module.exports = {findById}
// ()