require("dotenv").config();
const { UserModel } = require("../model/model.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const privateKey = process.env.PRIVATEKEY;

const LoginGET = async (req, res) => {
  try {
    const { key } = req.query;
    jwt.verify(key, privateKey, async function (err, decoded) {
      if (err) {
        res.status(500).json({ error: err.message });
        console.log(err);
      } else {
        const user = await UserModel.findOne({ _id: decoded.id });
        if (!user) {
          res.status(404).json({ error: "user Not Found" });
        } else {
          res.status(200).json({ user: true, user });
        }
      }
    });
  } catch (error) {
    res.status(401).json({ error: error.message });
    console.log(error);
  }
};

const RegisterPOST = async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashedPwd = await bcrypt.hash(password, 10);
    const user = {
      Email: email,
      Password: hashedPwd,
    };
    const result = await UserModel.create(user);
    const token = jwt.sign(
      {
        id: result._id,
      },
      privateKey,
      { expiresIn: "5d" }
    );
    res.status(201).json({ auth: true, key: token });
  } catch (error) {
    res.status(400).json({
      error:
        error.code == 11000
          ? { message: "Email is Already in Use!!", code: 11000 }
          : error.message,
    });
  }
};

const LoginPOST = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ Email: email });
    if (user) {
      bcrypt.compare(password, user.Password, (error, result) => {
        if (error) return res.status(500).json({ error: err.message });
        if (result) {
          const token = jwt.sign(
            {
              id: user._id,
            },
            privateKey,
            { expiresIn: "5d" }
          );
          res.status(200).json({ auth: true, key: token });
        } else {
          res.status(400).json({ error: "Wrong password!!" });
        }
      });
    } else {
      res.status(404).json({ error: "user Not Found!!" });
    }
  } catch (error) {
    res.status(401).json({ error: error.message });
    console.log(error);
  }
};

module.exports = { LoginGET, LoginPOST, RegisterPOST };
