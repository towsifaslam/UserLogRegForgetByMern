require('dotenv').config()


const port = process.env.SERVER_PORT;
const dbUrl = process.env.MONGO_URL ;
const defaultImagePath = process.env.DEFAULT_IMAGE_PATH || 'public/images/users/default.jpeg'
const secretKye = process.env.JWT_KEY || "towsif112"
const smtpUsername = process.env.SMTPUserName 
const smtpPassword = process.env.EmailPassword
const client_url  = process.env.CLIENT_URL 
const upload_dir = process.env.UPLOADFILE || public/images/users
const MIXFILE_SIZE = Number(process.env.MIXFILE_SIZE) || 2097152
const ALLOWED_FILE_TYPES = process.env.ALLOWED_FILE_TYPES || ['jpg','jpeg','png']
const JWT_ACCESS  = process.env.JWT_ACCESS  || 'towsif1234'
const JWT_Forget = process.env.FOGET_PASS || 'habib'

module.exports = {port,JWT_Forget,dbUrl,defaultImagePath,secretKye,smtpUsername,smtpPassword,client_url,JWT_ACCESS,upload_dir,ALLOWED_FILE_TYPES,MIXFILE_SIZE}