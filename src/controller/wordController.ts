exports.getAllword = (
  req: any,
  res: {
    status: (arg0: number) => {
      (): any;
      new (): any;
      json: { (arg0: string): void; new (): any };
    };
  }
) => {
  res.status(200).json("okhunjon");
};

exports.getWord = (
  req: any,
  res: {
    status: (arg0: number) => {
      (): any;
      new (): any;
      json: { (arg0: string): void; new (): any };
    };
  }
) => {
  res.status(200).json("word");
};
