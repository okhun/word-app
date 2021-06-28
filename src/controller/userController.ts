const Users = require("./../model/userModel");
const catchAsync = require("../utils/catchAsync");
const AppError2 = require("../utils/appError");
exports.createUser = catchAsync(
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
    const newUser = await Users.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    if (!newUser) {
      return next(new AppError2(`Incorrect e-mail or password`, 422));
    }
    res.status(200).json({
      status: "success",
      data: { user: newUser },
    });
  }
);
exports.getUser = catchAsync(
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
    const user = await Users.findById(req.params.id);
    if (!user) {
      return next(new AppError2(`User not found`, 404));
    }
    res.status(200).json({
      status: "success",
      data: { user },
    });
  }
);
exports.updateUser = catchAsync(
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
    const user = await Users.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "success",
      data: { user },
    });
  }
);
exports.deleteUser = catchAsync(
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
    await Users.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "success",
      data: null,
    });
  }
);
