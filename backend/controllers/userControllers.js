const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const crypto = require("crypto");

const userModel = require("../model/userModels");
const taskModel = require("../model/taskModels");

const makeToken = (id) =>
  jwt.sign({ id: id }, process.env.JWT_SECRATE, {
    expiresIn: process.env.JWT_EXPIRE,
  });

exports.getUser = async (req, res) => {
  const user = await userModel.find();
  res.status(200).json({
    status: "success",
    data: user,
  });
};

exports.addUser = async (req, res) => {
  const newUser = await userModel.create({ ...req.body });
  const token = makeToken(newUser._id);

  const cookieOptions ={
    expires: new Date(Date.now()+ process.env.COOKE_EXPIRE*24*60*60*1000),
    httpOnly:true
  }

  if(process.env.ENV=='pro')  cookieOptions.secure=true;

  res.cookie('jwt',token,cookieOptions);
  
  res.status(200).json({
    status: "success",
    token,
    expire:process.env.COOKE_EXPIRE,
    data: newUser,
  });
};

exports.deleteUser = async (req,res,next) =>{
  const user = await userModel.findByIdAndDelete({_id:req.user._id});
  const task = await taskModel.deleteMany({user:user._id});
  if(!user) return next(new Error("user not found"));

  res.status(200).json({
    status:"deleted",
    user
  })
}

exports.logginUser = async (req, res, next) => {
  const { userName, password } = req.body;
  if (!userName || !password) next(new Error("invilad username or password"));
  const user = await userModel.findOne({ userName: userName });

  if (!user || !(await user.checkPassword(password, user.password)))
    next(new Error("invilad username or password"));
  const token = makeToken(user._id);

  const cookieOptions ={
    expires : new Date(Date.now()+ process.env.COOKE_EXPIRE*24*60*60*1000),
    httpOnly:true
  }
  if(process.env.ENV=='pro')  cookieOptions.secure=true;

  res.cookie('jwt',token,cookieOptions);

  res.status(200).json({
    token,
    expire:process.env.COOKE_EXPIRE,
    status: "success",
  });
};

exports.protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) next(new Error("You are not login Please login again"));

  const decode = await promisify(jwt.verify)(token, process.env.JWT_SECRATE);
  const user = await userModel.findById(decode.id);
  if(!user) next(new Error("user dosn't exeit"));
  req.user = user;

  next();
};

exports.forgotPassword = async (req, res, next) => {
  const user = await userModel.findOne({ userName: req.body.userName });

  if (!user) return next(new Error("user not found"));

  const resetToken = await user.generateResetToken();
  await user.save({ validateBeforeSave: false });

  res.status(200).json({
    status: "success",
    resetToken: resetToken,
  });
};

exports.resetPassword = async (req, res, next) => {
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await userModel.findOne({
    passwordResetToken: hashedToken,
    passwordResetTokenExpireAt: { $gt: Date.now() },
  });

  if (!user) next(new Error("token is expire"));

  user.password = req.body.password;
  user.passwordResetTokenExpireAt = undefined;
  user.passwordResetToken = undefined;
  await user.save();

  const token = makeToken(user._id);

  const cookieOptions ={
    expires : new Date(Date.now()+ process.env.COOKE_EXPIRE*24*60*60*1000),
    httpOnly:true
  }

  if(process.env.ENV=='pro')  cookieOptions.secure=true;

  res.cookie('jwt',token,cookieOptions);

  res.status(200).json({
    status: "success",
    expire:process.env.COOKE_EXPIRE,
    token,
  });
};
