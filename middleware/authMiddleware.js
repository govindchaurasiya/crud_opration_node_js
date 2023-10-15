const jwt = require('jsonwebtoken');
// Middleware to verify JWT token
 const verifyToken = (req, res, next) => {
    console.log('req', req)
 const token = req.headers.authorization;
if (!token) {
 res.status(401).send('Authentication required.');
 return;
 }
jwt.verify(token,  process.env.TOKEN_KEY, (err, decoded) => {
 if (err) {
 res.status(403).send('Invalid token.');
 return;
 }
req.user = decoded;
console.log('insideMiddlleware')
 next();
 });
// next();
};
module.exports = {
    verifyToken
  }