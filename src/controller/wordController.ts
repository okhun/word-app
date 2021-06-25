const Words = require("./../model/wordModel");
exports.getAllword = async (
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
    const words = await Words.find();
    res.status(200).json({
      status: "success",
      results: words.length,
      data: { words },
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: "Invalid data send",
    });
  }
};

exports.getWord = async (
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
    const word = await Words.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: { word },
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: "Invalid data send",
    });
  }
};
