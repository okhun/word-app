const UserWord = require("../model/userwordModel");
exports.createUserWord = async (
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
    req.body.userId = req.params.id;
    req.body.wordId = req.params.wordid;

    const newUserWord = await UserWord.create(req.body);
    res.status(200).json({
      status: "success",
      data: { newUserWord },
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: "Invalid data send",
    });
  }
};
exports.getUserWord = async (
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
    const userWord = await UserWord.find({
      $and: [{ wordId: req.params.wordid }, { userId: req.params.id }],
    });
    res.status(200).json({
      status: "success",
      data: { userWord },
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: "Invalid data send",
    });
  }
};
exports.updateUserWord = async (
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
    const update = await UserWord.update(
      { $and: [{ wordId: req.params.wordid }, { userId: req.params.id }] },
      { $set: { word: req.body.word } }
    );
    res.status(200).json({
      status: "success",
      data: { update },
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: "Invalid data send",
    });
  }
};
exports.deleteUserWord = async (
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
    await UserWord.deleteMany({
      $and: [{ wordId: req.params.wordid }, { userId: req.params.id }],
    });
    res.status(200).json({
      status: "success",
      data: { result: null },
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: "Invalid data send",
    });
  }
};
exports.getUserWords = async (
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
    const userWords = await UserWord.find({ userId: req.params.id });
    res.status(200).json({
      status: "success",
      results: userWords.length,
      data: { userWords },
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: "Invalid data send",
    });
  }
};
