const jwt = require('jsonwebtoken');
const Users = require('../models/User');

module.exports.authenticate = (req, res, next) => {
  try{
    const token=req.header("Authorization")
    console.log(token)
    //console.log("token-------------------->",token)
    const user =jwt.verify(token,"hi") 
    console.log("user----->",user)  
    req.user=user
    next()
  
  }
  catch(err){
      console.log(err)
      return res.status(401).json({success:false})

  }
  
 
};