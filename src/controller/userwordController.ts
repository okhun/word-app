const UserWord = require("../model/userwordModel");
const catchAsync3 = require("../utils/catchAsync");
exports.createUserWord = catchAsync3(
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
    req.body.userId = req.params.id;
    req.body.wordId = req.params.wordid;

    const newUserWord = await UserWord.create(req.body);
    res.status(200).json({
      status: "success",
      data: { newUserWord },
    });
  }
);
exports.getUserWord = catchAsync3(
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
    const userWord = await UserWord.find({
      $and: [{ wordId: req.params.wordid }, { userId: req.params.id }],
    });
    res.status(200).json({
      status: "success",
      data: { userWord },
    });
  }
);
exports.updateUserWord = catchAsync3(
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
    const update = await UserWord.update(
      { $and: [{ wordId: req.params.wordid }, { userId: req.params.id }] },
      { $set: { word: req.body.word } }
    );
    res.status(200).json({
      status: "success",
      data: { update },
    });
  }
);
exports.deleteUserWord = catchAsync3(
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
    await UserWord.deleteMany({
      $and: [{ wordId: req.params.wordid }, { userId: req.params.id }],
    });
    res.status(200).json({
      status: "success",
      data: { result: null },
    });
  }
);
exports.getUserWords = catchAsync3(
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
    const userWords = await UserWord.find({ userId: req.params.id });
    res.status(200).json({
      status: "success",
      results: userWords.length,
      data: { userWords },
    });
  }
);
