const Users = require("./../model/userModel");

exports.createUser = async (
  req: any,
  res: {
    status: (arg0: number) => {
      (): any;
      new (): any;
      json: { (arg0: object): void; new (): any };
    };
  }
) => {
  try {
    const newUser = await Users.create(req.body);
    res.status(201).json({
      status: "success",
      data: { user: newUser },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Invalid data send",
    });
  }
};
exports.getUser = async (
  req: any,
  res: {
    status: (arg0: number) => {
      (): any;
      new (): any;
      json: { (arg0: object): void; new (): any };
    };
  }
) => {
  try {
    const user = await Users.findById(req.params.id);
    res.status(201).json({
      status: "success",
      data: { user },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Invalid data send",
    });
  }
};
exports.updateUser = async (
  req: any,
  res: {
    status: (arg0: number) => {
      (): any;
      new (): any;
      json: { (arg0: object): void; new (): any };
    };
  }
) => {
  try {
    const user = await Users.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(201).json({
      status: "success",
      data: { user },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Invalid data send",
    });
  }
};
exports.deleteUser = async (
  req: any,
  res: {
    status: (arg0: number) => {
      (): any;
      new (): any;
      json: { (arg0: object): void; new (): any };
    };
  }
) => {
  try {
    await Users.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Invalid data send",
    });
  }
};
