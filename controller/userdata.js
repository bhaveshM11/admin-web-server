const bcrypt = require('bcryptjs');
const UserData = require('../models/registeredUser');


const postUserData = async (req,res)=>{
    const {email,phone,fullname,username,password} = req.body;
  
    const passwordHash = await bcrypt.hash(password,10);
    UserData.create({email,phone,fullname,username,password:passwordHash})
    .then(()=>{
        res.status(200).json({message:'Successfully Registered User !!'})
    })
    .catch(()=>{res.json({error:"Failed to Registered"})})
}
module.exports = postUserData;