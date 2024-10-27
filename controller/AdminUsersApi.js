const UserData = require('../models/registeredUser');

const getAdminUsers = async(req,res,next) => {
    let findParam = {}
    if(req?.query?.email){
        findParam['email'] = req.query.email
    }
    const usersList = await UserData.find(findParam,{ _id: 0, __v: 0, password:0 }).sort({ _id: -1,createdOn:-1 });
    return res.status(200).json({message:"users list",data:usersList})
}

module.exports = {
    getAdminUsers,
}