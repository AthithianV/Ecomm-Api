import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

const jwtauth = (req, res, next) => {
  // 1. Read the token
  const token = req.headers["authorization"];

  // 2. Check if token present.
  if (!token) {
    return res.status(401).send("Unauthorized");
  }

  // 3. Verify Token
  try {
    const payload = jwt.verify(token, process.env.SECRETKEY);
    req.userID = payload.userID;
  } catch (err) {
    return res.status(401).send("Unauthorized");
  }

  // 5. Next middleware.
  next();
};

export default jwtauth;
