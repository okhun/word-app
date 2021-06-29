const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const UserAuth = require("./../model/userModel");
const catchAsyncA = require("./../utils/catchAsync");
const AppError4 = require("../utils/appError");

const signToken = (id: any) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
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

    // const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
    //   expiresIn: process.env.JWT_EXPIRES_IN,
    // });

    res.status(200).json({
      message: "Successful creation.",
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
    if (!user || !(await user.correctPassword(password, user.password))) {
      return next(new AppError4(`Incorrect email or password`, 403));
    }
    // 3) if everything is ok, send tokento client
    const token = signToken(user._id);
    res.status(200).json({
      message: "Authenticated",
      token,
      userId: user._id,
      name: user.name,
    });
  }
);
exports.protect = catchAsyncA(async (req: any, res: any, next: any) => {
  // 1) Getting token and check of it is there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return next(new AppError4("Access token is missing or invalid", 401));
  }

  // 2) Varification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  // 3) CHeck if user still exists
  const currentUser = await UserAuth.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError3(
        "The user belonging to this token does no longer exist.",
        401
      )
    );
  }
  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser;
  next();
});
