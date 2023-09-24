const nodemailer = require('nodemailer')
const { smtpUsername, smtpPassword } = require('../secret')
const createHttpError = require('http-errors')
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: smtpUsername,
    pass: smtpPassword
  }
});
  const sendEmailWithNodeMail = async(emailData)=>{

   try {
    
    const mailOptions={

      from: smtpUsername,
      to: emailData.email,
      subject: emailData.subject,
      html:emailData.html
     };
     
     const info = await transporter.sendMail(mailOptions);
       console.log('Message Sent : %s',info.response)
   } catch (error) {
    console.log("+++++++++++++++++++")
    next(createHttpError(404,error.message))
    console.log("+++++++++++++++++++")

    
   }
  }


module.exports = sendEmailWithNodeMail