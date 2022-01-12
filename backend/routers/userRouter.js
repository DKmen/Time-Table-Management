const express = require('express');
const userControllers = require('../controllers/userControllers');


const userRouter = express.Router();


userRouter.route('/').post(userControllers.addUser);
userRouter.route('/login').post(userControllers.logginUser);
userRouter.route('/forgotPassword').post(userControllers.forgotPassword);
userRouter.route('/resetPassword/:token').post(userControllers.resetPassword);
userRouter.route('/deleteUser').delete(userControllers.protect,userControllers.deleteUser)

module.exports = userRouter;