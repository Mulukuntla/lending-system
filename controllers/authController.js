const jwt = require('jsonwebtoken');
const Users = require('../models/User');
const bcrypt=require("bcrypt")

module.exports.login = async (req, res) => {
  const { username, password } = req.body;
  
  try {
    const user=await Users.find({"username":username})
    if(user.length>0){
      bcrypt.compare(password,user[0].password,(err,result)=>{
        if(err){
          throw new Error("Something went wrong")
        }
        if(result === true){
          console.log(user[0])
          const token = jwt.sign({userId:user[0]._id,username:user[0].username,role:user[0].role},'hi');
           
          return res.status(200).json({success:true,message:"User loggedin Successfully",token})
        }
        else{
          return res.status(401).json({success:false,message:"Password is incorrect"})
        }
      })
    }
    else{
      return res.status(404).json({success:false,message:"User not found"})

    }
    
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Server error' });
  }
};



module.exports.signup = async (req, res) => {
  console.log("hi")
  const { username, password } = req.body;
  console.log(req.body)
  
  try {
    const user=await Users.find({where:{username:username}})
    console.log("user------------>",user)
    if(user){
      
      return res.status(400).json({message:"user already exists",success:"false"})
    }
    const saltrounds=10
    console.log("username",username)
    console.log("password",password)
    bcrypt.hash(password,saltrounds,async (err,hash)=>{
      if (err) {
        return res.status(500).json({ success: false, message: "Error hashing password." });
      }
      console.log(username,password)
      await Users.create({username:username,password:hash})
      res.status(201).json({message:"Successfully created a new user"})
      
    })
    
    
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Server error' });
  }
};