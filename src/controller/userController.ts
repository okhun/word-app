const Users = require("./../model/userModel");
const catchAsync = require("../utils/catchAsync");
const AppError2 = require("../utils/appError");
const bcrypt2 = require("bcryptjs");

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
    if (req.body.password) {
      req.body.password = await bcrypt2.hash(req.body.password, 12);
    }

    const user = await Users.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    console.log(user);
    if (!user) {
      return next(new AppError2(`Bad request`, 400));
    }
    res.status(200).json({
      message: "The user has been updated.",
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
    const deleteuser = await Users.findById(req.params.id);
    if (!deleteuser) {
      return next(
        new AppError2(`User not found with this id:${req.params.id}`, 404)
      );
    }
    await Users.findByIdAndDelete(req.params.id);

    res.status(204).json({
      message: "The user has been deleted",
    });
  }
);

// exports.createUser = catchAsync(
//   async (
//     req: any,
//     res: {
//       status: (arg0: number) => {
//         (): any;
//         new (): any;
//         json: { (arg0: object): void; new (): any };
//       };
//     },
//     next: any
//   ) => {
//     const newUser = await Users.create({
//       name: req.body.name,
//       email: req.body.email,
//       password: req.body.password,
//     });
//     if (!newUser) {
//       return next(new AppError2(`Incorrect e-mail or password`, 422));
//     }
//     res.status(200).json({
//       status: "success",
//       data: { user: newUser },
//     });
//   }
// );
