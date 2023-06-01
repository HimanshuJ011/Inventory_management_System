const express = require('express');
const router = express.Router();
const userControl = require('../controllers/userController');

const protect = require('../middleware/authMiddlerware');

router.post('/register',userControl.registerUser);
router.post('/login',userControl.loginUser);
router.get('/logout',userControl.logoutUser);
router.get('/getuser', protect, userControl.getUser);


module.exports = router;