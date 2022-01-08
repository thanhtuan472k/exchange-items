const Posts = require("../models/post.model");

class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  filtering() {
    const queryObj = { ...this.queryString };
    const excludedFields = ["page", "sort", "limit"];
    excludedFields.forEach((x) => delete queryObj[x]);
    let queryStr = JSON.stringify(queryObj);
    // prepending gte, gt, lt, lte, regex with $ so that we can use
    // mongodb comparision query to filter items
    queryStr = queryStr.replace(
      /\b(gte|gt|lt|lte|regex)\b/g,
      (match) => "$" + match
    );
    this.query.find(JSON.parse(queryStr)); // find() --> mongodb method, not js
    return this;
  }
  sorting() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }
    return this;
  }
  pagination() {
    // returns a set of documents belonging to page number `page_num`
    // where size of each page is `page_size` (no. of item in a page or limit)
    // to Calculate number of documents to skip
    // skips = page_size * (page_num - 1)
    const page_num = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 6;
    const skip = limit * (page_num - 1);
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

//
const postCtrl = {
  getPost: async (req, res) => {
    try {
      const features = new APIFeatures(Posts.find(), req.query)
        .filtering()
        .sorting()
        .pagination();
      const posts = await features.query;
      res.json({
        status: "success",
        length: posts.length,
        posts,
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  getMyPost: async (req, res) => {
    try {
      const features = new APIFeatures(
        Posts.find({ seller_id: req.params.id }),
        req.query
      )
        .filtering()
        .sorting()
        .pagination();
      const posts = await features.query;
      res.json({
        status: "success",
        length: posts.length,
        posts,
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  createPost: async (req, res) => {
    try {
      const {
        seller_id,
        title,
        price,
        description,
        image,
        category,
        // condition,
         seller_name,
         student_class,
         major,
         phone,
         address,
      } = req.body;
      if (!image) {
        return res.status(400).json({ message: "Không có ảnh nào được upload" });
      }
      if (
        !seller_id ||
        !title ||
        !price ||
        !description ||
        !category
      ){
        return res.status(400).json({ message: "Vui lòng nhập đầy đủ thông tin vào các trường" });
      }
      // const product = await Products.findOne({id: req.params._id});
      // if (product) {
      //   return res.status(400).json({ message: "product with this id already exists" });
      // }
      const newPost = new Posts({
        seller_id,
        title: title.toLowerCase(),
        price,
        description,
        image,
        category,
        seller_name,
        student_class,
        major,
        phone,
        address,
      });
      await newPost
        .save()
        .then(() => {
          console.log("Thêm mới bài đăng thành công");
        })
        .catch((e) => {
          console.log(e);
        });
      res.status(201).json({ message: "Thêm mới bài đăng thành công" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  deletePost: async (req, res) => {
    try {
      await Posts.findByIdAndDelete({ _id: req.params.id });
      res.status(200).json({ message: "Xóa bài đăng thành công" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  updatePost: async (req, res) => {
    try {
      const {
        title,
        price,
        description,
        image,
        category
      } = req.body;
      if (!image) {
        return res.status(400).json({ message: "Không có ảnh nào được upload" });
      }
      await Posts.findByIdAndUpdate(
        { _id: req.params.id },
        {
          title: title.toLowerCase(),
          price,
          description,
          image,
          category,
        }
      );
      res.status(201).json({ message: "Cập nhật thành công" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
};

module.exports = postCtrl;
