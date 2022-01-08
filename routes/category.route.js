const router = require("express").Router();
const categoryCtrl = require("../controllers/category.controller");
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');

router.route('/category')
    .get(categoryCtrl.getCategory)
    .post( categoryCtrl.createCategory)
router.route("/category/:id")
    .delete(auth, adminAuth, categoryCtrl.deleteCategory)
    .put(auth, adminAuth, categoryCtrl.updateCategory);


module.exports = router;