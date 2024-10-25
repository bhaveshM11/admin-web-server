const express = require('express')
const router = express.Router();

const signUpAuth = require('../controller/signupauth');
const loginAuth = require('../controller/loginauth')
const postUserData = require('../controller/userdata');

router.post('/register',signUpAuth, postUserData)

router.post('/login',loginAuth)

router.get('/',(req,res)=>{
    res.send("Welcome to Admin Server!")
})



module.exports = router;


