import jwt from "jsonwebtoken";

const isAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res
        .status(401)
        .json({ message: "Access denied. Please login first." });
    }

    const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!verifyToken) {
      return res
        .status(401)
        .json({ message: "invalid token credential ,Please login" });
    }

    req.user = decoded._id;

    next();
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
};

export default isAuth;
