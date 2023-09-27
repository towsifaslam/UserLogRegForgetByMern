const {body} = require('express-validator')



const validatoreCategory = [
  body('name')
         .trim()
         .notEmpty()
         .withMessage('Name is required, enter your category name')
         .isLength({min:3})
         .withMessage('Name shoud be at least 3')  
];

module.exports ={
  validatoreCategory
}