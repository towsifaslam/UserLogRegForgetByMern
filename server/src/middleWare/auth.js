const {body} = require('express-validator')

const valildationUserRegistration = [
  body('name')
             .trim()
              .notEmpty()
             .withMessage('name is required')
             .isLength({min:3,max:31})
             .withMessage('name should be at least 3-31 character long'),
    body('email')
             .trim()
             .notEmpty()
             .withMessage('email is required')
             .isEmail()
             .withMessage('Invalid email'),
    body('password')
            .trim()
            .notEmpty()
            .withMessage('password is requierd')    
            .isLength({min:3,max:32})
            .withMessage('password should be at least 3-32 charactores'),
    body('address')
         .trim()
         .notEmpty()
         .withMessage('address is required')
         .isLength({min:3})
         .withMessage('address 3 minimum'),
         body('phone')
         .trim()
         .notEmpty()
         .withMessage('phone is required')
        
                      
                
]

const ValidatorUser= [
        
          body('email')
                   .trim()
                   .notEmpty()
                   .withMessage('email is required')
                   .isEmail()
                   .withMessage('Invalid email'),
          body('password')
                  .trim()
                  .notEmpty()
                  .withMessage('password is requierd')    
                  .isLength({min:3,max:32})
                  .withMessage('password should be at least 3-32 charactores'),
          
                            
                      
      ]
      const UserPasswordValidatorUser= [
        
        body('email')
                 .trim()
                 .notEmpty()
                 .withMessage('oldpassword is required')
                 .isEmail()
                 .withMessage('Invalid password'),
        body('oldPassword')
                .trim()
                .notEmpty()
                .withMessage('password is requierd')    
                .isLength({min:3,max:32})
                .withMessage('password should be at least 3-32 charactores'),
 body('newPassword')
                .trim()
                .notEmpty()
                .withMessage('newpassword is requierd')    
                .isLength({min:3,max:32})
                .withMessage('password should be at least 3-32 charactores'),        
   body('confirmedPassword').custom((value,{req})=>{
        if(value !== req.body.newPassword){
                throw new Error('password did not match')
        }
        return true
   })     
                          
                    
    ]


module.exports ={valildationUserRegistration,ValidatorUser,UserPasswordValidatorUser}