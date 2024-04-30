import jwt from "jsonwebtoken";

export const getTokenData = (req) => {
  try {
    const token = req.cookies.get("token")?.value || "";
    const verifiedToken = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
    return verifiedToken.id;
  } catch (err) {
    throw err;
  }
};