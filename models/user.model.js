const mongoose = require('mongoose');
// const { v4: uuidv4 } = require("uuid");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please enter your username"],
    },
    email: {
      type: String,
      required: [true, "Please enter your email"],
      unique: true,
      match: [
        // regex
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "  Vui lòng nhập đúng định dạng email",
      ],
    },
    password: {
      type: String,
      required: [true, "Vui lòng nhập vào password "],
      minlength: 6,
      select: false,
    },
    name: {
      type: String,
      required: [true, "Vui lòng nhập vào họ tên"],
    },
    phone: {
      type: String,
      maxlength: 12,
      required: [true, "Vui lòng nhập vào số điện thoại"],
    },
    gender: {
      type: String,
      required: [true, "Vui lòng lựa chọn giới tính"],
    },
    address: {
      type: String,
    },
    student_class: {
      type: String,
    },
    major: {
      type: String,
    },
    avatar: {
      type: String,
      default:
        "https://res.cloudinary.com/dxnfxl89q/image/upload/v1612713326/fullauth/pkvlumfwc2nxtdnwcppk.jpg",
    },
    cloudinary_id: {
      type: String,
      default: "dadsadasdas",
    },
    star_vote: {
      type: Number,
      default: 0,
    },
    role: {
      type: Number,
      default: 0, // 0 is user, 1 is admin
    },
    resetPasswordToken: {
      type: String,
    },
    resetPasswordExpire: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('User', userSchema);