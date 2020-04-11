const router = require('express').Router()
const postController = require("../controllers/postController")

router
    .route("/")
    .get(postController.index)
    
router
    .route("/posts")
    .get(postController.indexPosts)
    .post(postController.newOrEdit)
router
    .route("/posts/:id")
    .get(postController.viewPosts)
router
    .route("/posts/delete/:id")
    .get(postController.deletePosts)

module.exports=router