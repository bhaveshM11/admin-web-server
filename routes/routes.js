const express = require('express')
const router = express.Router();

const {RegisterAuth,StoreUserData} = require('../controller/loginRegister');
const {loginAuth} = require('../controller/loginRegister')
const {jwtAuthentication,getUserByEmail,jwtVerifyResponse} = require('../controller/authentication')
const {getAdminUsers} = require('../controller/AdminUsersApi')

router.post('/register',RegisterAuth, StoreUserData)

router.post('/login',loginAuth)

router.post('/verify-jwt',jwtAuthentication,getUserByEmail,jwtVerifyResponse)

router.get('/admin-users-lists',jwtAuthentication,getAdminUsers)


router.get('/',(req,res)=>{
    res.send("Welcome to Admin Server!")
})



module.exports = router;


