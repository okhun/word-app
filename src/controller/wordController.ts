const Words = require("./../model/wordModel");
const catchAsync2 = require("../utils/catchAsync");
exports.getAllword = catchAsync2(
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
    const words = await Words.find();
    res.status(200).json({
      status: "success",
      results: words.length,
      data: { words },
    });
  }
);

exports.getWord = catchAsync2(
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
    const word = await Words.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: { word },
    });
  }
);
