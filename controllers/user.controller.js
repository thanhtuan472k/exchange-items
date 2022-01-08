const Users = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ErrorResponse = require('../utils/errorResponse');

const userCtrl = {
  register: async (req, res) => {
    try {
      const { username, email, password, name, student_class, major, phone, gender, address } = req.body;
      if (
        !username ||
        !email ||
        !password ||
        !name ||
        !student_class ||
        !major ||
        !phone ||
        !gender ||
        !address
      ) {
        return res.status(400).json({ message: "Vui lòng nhập đầy đủ thông tin" });
      }
      if (password.length < 6) {
        return res
          .status(400)
          .json({ message: "Mật khẩu phải dài hơn 6 kí tự" });
      }
      const user = await Users.findOne({ username });
      if (user) {
        return res.status(400).json({ message: "Tên đăng nhập đã tồn tại" });
      }
      // password hashing
      const newUser = new Users({
        username,
        email,
        password,
        name,
        student_class,
        major,
        phone,
        gender,
        address,
      });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          //save user
          newUser
            .save()
            .then(() => {
              console.log("Đăng kí ok");
            })
            .catch((e) => {
              console.log(e);
            });
        });
      });
      //
      const refreshtoken = createRefreshToken({ id: newUser._id });
      const accesstoken = createAccessToken({ id: newUser._id });
      //
      res.cookie("refreshtoken", refreshtoken, {
        httpOnly: true,
        path: "/user/check-auth",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      res.status(200).json({ accesstoken });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error.message });
    }
  },
  login: async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await Users.findOne({ username }).select("+password");
      if (!user) return res.status(400).json({ message: "Tên đăng nhập không tồn tại" });
      const ismatch = await bcrypt.compare(password, user.password);
      if (!ismatch)
        return res.status(400).json({ message: "Mật khẩu không chính xác" });
      //
      const refreshtoken = createRefreshToken({ id: user._id });
      const accesstoken = createAccessToken({ id: user._id });
      console.log(refreshtoken);
      console.log(accesstoken);
      //
      res.cookie("refreshtoken", refreshtoken, {
        httpOnly: true,
        path: "/user/check-auth",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      res.status(200).json({ accesstoken });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  logout: async (req, res) => {
    try {
      res.clearCookie("refreshtoken", { path: "/user/check-auth" });
      return res.json({ message: "logged out" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  refreshToken: (req, res) => {
    try {
      const rf_token = req.cookies.refreshtoken;
      if (!rf_token) {
        return res.status(400).json({ message: "Vui lòng đăng nhập lại hoặc đăng ký" });
      }
      jwt.verify(rf_token, process.env.REFRESH_TOKEN_ACCESS, (e, user) => {
        if (e) {
          res
            .status(400)
            .json({ message: "Vui lòng đăng nhập lại hoặc đăng ký" });
        }
        const accesstoken = createAccessToken({ id: user.id });
        res.json({ accesstoken });
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
    // res.json({rf_token})
  },
  getUser: async (req, res) => {
    try {
      const user = await Users.findById(req.user.id).select("-password");
      if (!user)
        return res.status(400).json({ message: "Tên đăng nhập không tồn tại" });
      res.json(user);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  getUserInfo: async (req, res) => {
    try {
      const user = await Users.findById(req.params.userId).select("-password");
      if (!user)
        return res.status(400).json({ message: "Tên đăng nhập không tồn tại" });
      res.json(user);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
};
const createAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "11m" });
};
const createRefreshToken = (user) => {
  return jwt.sign(user, process.env.REFRESH_TOKEN_ACCESS, { expiresIn: "7d" });
};

module.exports = userCtrl;
