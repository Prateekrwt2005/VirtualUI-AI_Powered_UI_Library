import jwt from 'jsonwebtoken';

const isAuth = async (req, res, next) => {
  try {
    console.log("Headers Cookie:", req.headers.cookie);
    console.log("Cookies:", req.cookies);

    let token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        message: "Unauthorized - No Token"
      });
    }

    const verifyToken = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    console.log("Verified Token:", verifyToken);

    req.userId = verifyToken.userId;

    next();
  } catch (error) {
    console.log("AUTH ERROR:", error);
    return res.status(401).json({
      message: "Unauthorized"
    });
  }
};

export default isAuth;