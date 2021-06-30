const UserWord = require("../model/userwordModel");
const catchAsync3 = require("../utils/catchAsync");
const AppError5 = require("../utils/appError");
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
    if (req.user.id !== req.params.id) {
      return next(new AppError5("Bad request", 400));
    }
    req.body.userId = req.params.id;
    req.body.wordId = req.params.wordid;

    const newUserWord = await UserWord.create(req.body);
    res.status(200).json({
      status: "Successful operation",
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
    if (req.user.id !== req.params.id) {
      return next(new AppError5("Bad request", 400));
    }
    const userWord = await UserWord.find({
      $and: [{ wordId: req.params.wordid }, { userId: req.params.id }],
    });
    if (!userWord) {
      return next(new AppError2("User'word not found"));
    }
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
    if (req.user.id !== req.params.id) {
      return next(new AppError5("Bad request", 400));
    }
    const updateus = await UserWord.find({
      $and: [{ wordId: req.params.wordid }, { userId: req.params.id }],
    });
    if (!updateus) {
      return next(
        new AppError2(
          `User word not found with userId:${req.params.id} and wordid:${req.params.wordid}`
        )
      );
    }
    const update = await UserWord.update(
      { $and: [{ wordId: req.params.wordid }, { userId: req.params.id }] },
      { $set: { word: req.body.word } }
    );

    res.status(200).json({
      status: "Successful operation",
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
    if (req.user.id !== req.params.id) {
      return next(new AppError5("Bad request", 400));
    }
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
    if (req.user.id !== req.params.id) {
      return next(new AppError5("Bad request", 400));
    }
    const userWords = await UserWord.find({ userId: req.params.id });
    res.status(200).json({
      status: "success",
      results: userWords.length,
      data: { userWords },
    });
  }
);
exports.getAggregatedWords = catchAsync3(
  async (req: any, res: any, next: any) => {
    if (req.user.id !== req.params.id) {
      return next(new AppError5("Bad request", 400));
    }
    const queryObj = { ...req.query };
    const excludedFields = ["page", "group", "wordsPerPage"];
    excludedFields.forEach((el) => delete queryObj[el]);
    let queryStr = JSON.stringify(queryObj);
    queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    const query = JSON.parse(queryStr);
    const aggWords = await UserWord.find({
      $and: [
        { "word.difficulty": req.query.difficulty },
        { userId: req.params.id },
      ],
    });

    res.status(200).json({
      status: "success",
      data: { aggWords },
    });
  }
);
exports.getAggregatedWordsById = catchAsync3(
  async (req: any, res: any, next: any) => {
    res.status(204).json({
      message: "The user has been deleted",
    });
  }
);
