const Category = require('../models/category.model');

const categoryCtrl = {
    getCategory: async (req, res) => {
        try {
            const categories = await Category.find();
            res.json(categories);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
    createCategory: async (req, res) => {
        try {
          const { name } = req.body;
          const category = await Category.findOne({ name });
          if (category) {
            return res
              .status(200)
              .json({ message: "Danh mục đã tồn tại" });
          }
          const newCategory = new Category({ name });
          const savedCategory = await newCategory.save();
          res
            .status(201)
            .json({ category: savedCategory, message: "Thêm danh mục thành công" });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
    deleteCategory: async (req, res) => {
        try{
            const delCategory = await Category.findByIdAndDelete(req.params.id);
            res.json({message: "Xóa danh mục thành công"})
        }
        catch(error){
            return res.status(500).json({ message: error.message });
        }
    },
    updateCategory: async (req, res) => {
        try {
            const {name} = req.body;
            await Category.findByIdAndUpdate({_id: req.params.id}, {name});
            res.json({ message: "Cập nhật danh mục thành công" });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

module.exports = categoryCtrl;