const UserData = require('../models/registeredUser');
const bcrypt = require('bcryptjs');
const {signJWTtoken} = require('./authentication')

const loginAuth = async (req, res, next) => {
  const { phone, email, password } = req.body;

  if (!password || (!phone && !email)) {
    return res.status(400).json({ error: 'Please provide email or phone and password' });
  }

  // Determine login field
  const loginField = phone ? { phone } : { email };
  const identifier = phone ? 'phone' : 'email';
  
  // Validate phone format if provided
  if (phone && phone.length !== 10) {
    return res.status(401).json({ error: 'Please Enter Valid Phone No' });
  }

  try {
    const user = await UserData.findOne(loginField);
    if (!user) {
      return res.status(401).json({ message: `${identifier} not registered` });
    }

    // Check password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Incorrect password!' });
    }

    // Generate token
    const token = signJWTtoken( user.email, user.userId );
    res.json({
      Auth_token:token,
      user:{name:user.name,email:user.email},
      message: `Successfully Logged In with ${identifier} as ID`,
    });

  } catch (error) {
    next(error);
  }
};

const RegisterAuth = async (req, res, next) => {
    // Check if email is already registered
    try {
       const user = await UserData.findOne({ email: req.body.email });
       if (user) {
          return res.status(400).json({ message: 'Email already registered' });
       }
       next(); // Proceed to next middleware if no issues
    } catch (error) {
       next(error); // Handle any other errors
    }
 }
 
 const StoreUserData = async (req, res) => {
     const { email, name, password } = req.body;
 
     try {
         // Hash the password
         const passwordHash = await bcrypt.hash(password, 10);
 
         // Find the highest existing user ID and increment it by 1
         const lastUser = await UserData.findOne({ userId: { $exists: true } }).sort({ userId: -1 });
         const newUserId = lastUser ? lastUser.userId + 1 : 70000; // Default to 1 if no users exist
 
         const userData = await UserData.create({
             userId: newUserId,
             email,
             name,
             password: passwordHash,
             createdOn: new Date()
         });
 
         // Sign JWT token
         const token = signJWTtoken( userData.email, userData.userId)
 
         // Send successful response with token and user info
         res.status(200).json({
             message: 'Successfully Registered User!',
             Auth_token: token,
             user: {
                 userId: userData.userId,
                 name: userData.name,
                 email: userData.email,
             },
         });
     } catch (error) {
         res.status(401).json({
             message: error.message || "An unexpected error occurred",
         });
     }
 }
module.exports = {
        loginAuth,
        RegisterAuth,
        StoreUserData
}
