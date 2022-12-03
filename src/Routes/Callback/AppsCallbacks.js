const Tokenverify = async (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization;
    console.log(token);
    console.log("Verify token");
    if (token) {
      jwt.verify(token, process.env.SECRETKEY, function (err, decoded) {
        if (err) {
          return res.status(403).json({
            status: "failed",
            message: "Invalid token",
          });
        }
        req.user = decoded.userPresent;
        next();
      });
    } else {
      return res.status(403).json({
        status: "failed",
        message: "Invalid token",
      });
    }
  } else {
    return res
      .status(403)
      .json({ status: "Failed", message: "Not authenticated user" });
  }
};

module.exports = { Tokenverify };
