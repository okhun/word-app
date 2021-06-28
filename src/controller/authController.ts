const jwt = require("jsonwebtoken");
const UserAuth = require("./../model/userModel");
const catchAsyncA = require("./../utils/catchAsync");
const AppError4 = require("../utils/appError");
exports.signup = catchAsyncA(
  async (
    req: any,
    res: {
      status: (arg0: number) => {
        (): any;
        new (): any;
        json: { (arg0: object): void; new (): any };
      };
    },
    next: any
  ) => {
    const newUser = await UserAuth.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.status(200).json({
      status: "success",
      token,
      data: { user: newUser },
    });
  }
);
exports.login = catchAsyncA(
  async (req: { body: { email: any; password: any } }, res: any, next: any) => {
    const { email, password } = req.body;
    // 1) Check if password and email exist
    if (!email || !password) {
      return next(new AppError4(`Please provide email and password`, 400));
    }
    // 2) Check if user exists and password is correct
    const user = await UserAuth.findOne({ email }).select("+password");
    const correct = user.correctPassword(password, user.password);
    if (!user || !correct) {
      return next(new AppError4(`Incorrect email or password`, 401));
    }
    // 3) if everything is ok, send tokento client
    const token = "";
    res.status(200).json({ message: "Authenticated", token, userId: user._id });
  }
);
