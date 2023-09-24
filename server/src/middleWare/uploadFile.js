const multer = require('multer')
const {upload_dir} = require('../secret')
const UPLOAD = upload_dir
const path = require('path')
const {ALLOWED_FILE_TYPES,MIXFILE_SIZE} = require('../secret')
const createHttpError = require('http-errors')

const storege = multer.memoryStorage({
  destination: function(req,file,cb){
    cb(null,UPLOAD)
  },
  filename:function(req,file,cb){
   const extname = path.extname(file.originalname)
   cb(null,Date.now()+"-"+file.originalname.replace(extname,""+extname))
  }
})

const fileFilter = (req,file,cb)=>{
  const extname = path.extname(file.originalname);
  if(!ALLOWED_FILE_TYPES.includes(extname.substring(1))){
  const error=  createHttpError(400, 'file type onot allowd')
  return cb(error)
  }
  cb(null,true)
}

const upload = multer({storage:storege,limits:{fileSize:MIXFILE_SIZE},fileFilter})
module.exports = upload