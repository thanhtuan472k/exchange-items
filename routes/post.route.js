const router = require("express").Router();
const postCtrl = require("../controllers/post.controller");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/adminAuth");

// auth,
router
  .route("/posts")
  .get(postCtrl.getPost)
  .post(auth, postCtrl.createPost);

router
  .route("/posts/:id")
  .get(auth, postCtrl.getMyPost)
  .delete(auth, postCtrl.deletePost)
  .put(auth, postCtrl.updatePost);

module.exports = router;
