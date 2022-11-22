import jsonwebtoken from "jsonwebtoken";
import "dotenv/config";

const auth = (req, res, next) => {
  const token = req.header("x-auth-token");
  //console.log(token);

  if (!token) {
    return res
      .status(401)
      .json({ msg: "you are not authorized to view this resource!" });
  }

  console.log(token);
  try {
    const decoded = jsonwebtoken.verify(token, process.env.jwtSecret);
    req.user = decoded.user;
    console.log("user", user);
  } catch (error) {}
  next();
};
export default auth;
