import express from "express";
import { check, validationResult } from "express-validator";
import bcryptjs from "bcryptjs";
import JsonWebToken from "jsonwebtoken";
import User from "../models/User.js";
import "dotenv/config";
import auth from "../middleware/auth.js";

const router = express.Router();

// @route get api/auth
// @description Test rout
// @access Public

router.get("/", auth, (req, res) => res.send("Test auth Social"));

// @route get post/auth
// @description auth rout
// @access Public

router.post(
  "/",
  [
    check("email", "Email is not Valid email").isEmail(),
    check("password", "Password must have min length of 4").isLength({
      min: 4,
    }),
  ],
  async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else {
      console.log("req", req.body);

      const { email, password } = req.body;
      try {
        let user = await User.findOne({ email: email });
        if (!user) {
          return res
            .status(400)
            .json({ errors: [{ msg: "User does not exist." }] });
        }

        const isValidPassword = await bcryptjs.compare(password, user.password);
        //console.log("parola este valida?", isValidPassword);

        const payload = {
          user: {
            id: user.id,
          },
        };

        JsonWebToken.sign(
          payload,
          process.env.jwtSecret,
          { expiresIn: 360000 },
          (err, token) => {
            if (err) throw err;
            //console.log(token);
            return res.json({ token: token });
          }
        );
      } catch (error) {
        return res.status(500).send("Server Errors!!!");
      }
    }
  }
);

export default router;
