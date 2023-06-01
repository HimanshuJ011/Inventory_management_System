const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const jwtsecret = "joshi777";
const User = require("../model/userModel");



const protect = asyncHandler(async (req, res, next) => {

  if(!req.cookies.jwt) return res.json({ error: 'Please Login' });

  const clientToken = req.cookies.jwt;
    // Verify Token
   try {
    const verified = jwt.verify(clientToken, jwtsecret);
      req.user = verified.payload;
      const user =  await User.findById(req.user);
      next();
   } catch (error) {
    return res.json({error: 'Invalid Token'})
   }
  
});

module.exports = protect;
