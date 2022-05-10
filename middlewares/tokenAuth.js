// const jwt = require('jsonwebtoken');
const UserToken = require('../authentications/JavascriptWebToken');

const tokenAuth = (req, res, next) => {
  const { authorization } = req.headers;
  console.log('linha 6: ', authorization);
  if (!authorization) {
    console.log('linha dentro do if: ', authorization);
    return res.status(401).json({ message: 'Token not found' });
  }
  console.log('linha 11: ', authorization);
  if (authorization !== 'undefined') {
    // console.log('linha dentro do if do try catch: ', authorization);
  try {
    const user = UserToken.verifyToken(authorization);
    console.log(user);
    req.userId = user.id;
    } catch (error) {
      console.log('verifyToken');
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
  }
  next();
}; 

// function tokenAuth(req, res, next) { 
//   const { authorization } = req.headers; 
//     if (!authorization) {
//     return res.status(401).json({ message: 'Token not found' });
//   }
  
//   jwt.verify(authorization, 'olatrybe', (err, decoded) => { 
//       if (err) {
//       return res.status(401).json({ message: 'Expired or invalid token' });      
//       }
//       req.user = decoded.id; 
//       next(); 
//   }); 
// }  

module.exports = { tokenAuth };

// https://www.luiztools.com.br/post/autenticacao-json-web-token-jwt-em-node-js-2/