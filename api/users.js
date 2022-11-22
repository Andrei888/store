import express, { request, response } from "express";
import { check, validationResult } from "express-validator";
import gravatar from "gravatar";
import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import users from "../models/User.js";
import "dotenv/config";

const router = express.Router();

router.get("/", (req, res) => res.send("Test users Social"));

// @route get post/users
// @description Users rout
// @access Public

router.post(
  "/",
  [
    check("name", "Name is required!").not().isEmpty(),
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
      const { name, email, password } = req.body;
      try {
        let user = await users.findOne({ email: email });

        if (user) {
          console.log("User exist");
          return res
            .status(400)
            .json({ errors: { msg: "User already exists" } });
        }
        // get avatar
        const avatar = gravatar.url(email, {
          s: "200",
          r: "pg",
          d: "mm",
        });

        user = new users({
          name: name,
          email: email,
          password: password,
          avatar: avatar,
        });

        const salt = await bcryptjs.genSalt(10);
        user.password = await bcryptjs.hash(password, salt);

        await user.save();

        const payload = {
          user: {
            id: user.id,
          },
        };

        jsonwebtoken.sign(
          payload,
          process.env.jwtSecret,
          { expiresIn: 360000 },
          (err, token) => {
            if (err) throw err;
            console.log(token);
            return res.json({ token: token });
          }
        );

        // return res.status(201).json(user);
      } catch (error) {
        return res.status(500).send("Server Errors!!!");
      }
    }
  }
);

export default router;
