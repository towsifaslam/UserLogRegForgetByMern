const fs = require('fs')
const deleteImage = async(userImagePath)=>{
try {
  await fs.access(userImagePath);
  await fs.unlink(userImagePath);

  console.log('user image was deleted')
  
} catch (error) {
   console.log({message:'user img not found'},error)
}

 
}

module.exports = deleteImage;