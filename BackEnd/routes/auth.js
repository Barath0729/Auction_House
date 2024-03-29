const express=require('express');
const { registerUser,
    loginUser,
    logoutUser,
    forgotPassword ,
    resetPassword,
    getUserProfile, 
    changePassword
    } = require('../controllers/authController');
const router = express.Router();
const { isAuthenticatedUser} = require('../middleware/authenticate');

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').get(logoutUser);
router.route('/password/forgot').post(forgotPassword);
router.route('/password/reset/:token').post(resetPassword);
router.route('/myprofile').get(isAuthenticatedUser,getUserProfile);
router.route('/password/change').post(isAuthenticatedUser,changePassword);



module.exports = router;