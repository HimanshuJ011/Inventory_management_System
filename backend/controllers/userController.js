const asyncHandler = require("express-async-handler");
const User = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const jwtsecret = "joshi777";

function generateToken(payload) {
  const token = jwt.sign(payload, jwtsecret);
  return token;
}

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("All fields are Mandatory");
  }
  if (password.length < 6) {
    res.status(400);
    throw new Error("Password must be up to 8 Character");
  }
  const userAvailable = await User.findOne({ email });

  if (userAvailable) {
    res.status(400);
    return res.json({ error: "User alreay Exist" });
  }
  // creating a new user
  const newuser = await User.create({
    name,
    email,
    password,
  });

  if (newuser) {
    res.status(200).json({
      _id: newuser.id,
      mail: newuser.email,
      password: newuser.password,
    });
  } else {
    res.status(400);
    throw new Error("Data is Not Valid");
  }
});
// Login

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are Mandatory");
  }

    const userexist = await User.findOne({email});

    if (!userexist) {
      res.status(400).json({
        message: "Login not successful , user not exist",
      });
    } 
  
    const passwordIsCorrect = await bcrypt.compare(password, userexist.password);
  
      if (userexist && passwordIsCorrect) {
        const { _id, name, email, bio } = userexist;
        const token = generateToken(_id);
        res.cookie('jwt', token).status(200).json({
        _id,
        name,
        email,
        bio,
        token,
      });
      } else {
        res.status(400);
        throw new Error("Invalid email or password");
      }
  });

//logout
const logoutUser = asyncHandler(async (req, res) => {
  //  HTTP cookie only
  res.clearCookie("jwt", {
    path: "/",
    httpOnly: true,
    expires: new Date(Date.now()),
    sameSite: "strict",
    secure: true,
  });
  // res.cookie("token", "", {
  //     path:"/",
  //     httpOnly: true,
  //     expires:new Date(0), // 1 day
  //     sameSite:"none",
  //     secure:true
  // });
  return res.status(200).json({ message: "Successfully Logout" });
});
//get user

const getUser = asyncHandler(async (req, res) => {
  
  const user =  await User.findById(req.user);
  const { _id, name, email, bio } = user;
  if(user){
    res.status(200).json({
      _id,
      name,
      email,
      bio
    })
  }else{
    res.status(400);
    throw new Error("User not found");
  }
});

module.exports = { registerUser, loginUser, getUser, logoutUser };


