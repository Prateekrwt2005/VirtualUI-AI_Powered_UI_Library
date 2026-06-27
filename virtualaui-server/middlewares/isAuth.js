import jwt from 'jsonwebtoken';
import { User } from "../models/user.model.js";

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

    const user = await User.findById(verifyToken.userId);

if (!user) {
  return res.status(401).json({
    message: "User not found",
  });
}

req.user = user;
req.userId = user._id;

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