const jwt = require('jsonwebtoken');
const UserData = require('../models/registeredUser');
const bcrypt = require('bcryptjs');

const jwtAuthentication = async (req, res, next) => {
  const token = req.headers['token'];
  
  // Verify JWT if present
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      req.user = decoded; // attach decoded data to request
    } catch (err) {
      return res.status(401).json({ error: 'Invalid or expired token' });
    }
  }else{
    return res.status(401).json({ error: 'Missing token in headers' });
  }
  if(req?.user?.email && req?.user?.userId){
    next()
  }else{
    return res.status(401).json({ error: 'Invalid Token' });
  }
  
};

const getUserByEmail = async (req,res,next) => {
    const email = req.user.email
    try {
        const user = await UserData.findOne({email}).select('-password');
        if (!user) {
          return res.status(401).json({ message: `email not registered` });
        }
        req.user = user
      } catch (error) {
        return res.status(401).json({ error: 'Can not find User' });
      }
      next()
}

const jwtVerifyResponse = async (req, res) => {
    return res.status(200).json({msg:"Successfully verified!",user:req.user}) 
}

const signJWTtoken = (email,userId) => {
    return jwt.sign({ email: email,userId: userId}, process.env.SECRET_KEY);
}



module.exports = {
        jwtAuthentication,
        jwtVerifyResponse,
        getUserByEmail,
        signJWTtoken
    };