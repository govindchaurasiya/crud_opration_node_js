

// Middleware to verify JWT token
 const validation = (req, res, next) => {
    
console.log('inSideValidation Middleware >>>>>>>>>>>>>>>>>>>>>')
next();
};
module.exports = {
    validation
  }