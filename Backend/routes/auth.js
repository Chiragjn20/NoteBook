const express = require('express');
const User = require('../models/User');
const router = express.Router();
const {body , validationResult} = require('express-validator');
const { findOne } = require('../models/User');
var jwt =require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const JWT_SECRET = 'Thesecrettoken';
var fetchuser = require('../middleware/fetchuser');

 router.post('/createuser' ,[
    body('email', "Enter a valid email").isEmail(),
    body('name'," Enter a valid name").isLength({ min: 3 }),
    body('password', " Enter a valid password").isLength({ min: 5 }),
] , async (req, res)=>{
    const errors = validationResult(req);
    let success = false;
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //check if email exist already

    try{
    let user = await User.findOne({email: req.body.email});
    if(user){
      return res.status(400).json({success ,error:"email already exist"})
    }
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt)
     user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,

      })
      const data = {
        user:{
          id:user.id
        }
      }

      const authtoken = jwt.sign(data , JWT_SECRET);
      success = true
      res.json({success,authtoken})
    }catch(error){
      console.error(error.message);
      res.status(500).send("some error occured");
    }
      // .then(user => res.json(user))
      // .catch(err=>{console.log(err)
      // res.json({error:'Please enter unique value'})})
      // ;

     
})

router.post('/login', [ 
  body('email', 'Enter a valid email').isEmail(), 
  body('password', 'Password cannot be blank').exists(), 
], async (req, res) => {

  // If there are errors, return Bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {email, password} = req.body;
  let success = false;
  try {
    let user = await User.findOne({email});
    if(!user){
      return res.status(400).json({error: "Please try to login with correct credentials"});
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if(!passwordCompare){
      return res.status(400).json({ success: success, error: "Please try to login with correct credentials"});
    }

    const data = {
      user:{
        id: user.id
      }
    }
    const authtoken = jwt.sign(data, JWT_SECRET);
    res.json({success: true,authtoken})

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }


})

router.post('/getuser',fetchuser, async (req, res)=>{

try {

  let userId = req.user.id;
  const user = await User.findById(userId).select("-password")
  res.send(user)
} catch (error) {
  console.error(error.message);
        res.status(500).send("some error occured");
}

})



module.exports = router