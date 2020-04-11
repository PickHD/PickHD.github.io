const router = require('express').Router()
const userController = require("../controllers/userController")

router
    .route("/register")
    .get(userController.indexRegister)
    .post(userController.newRegister);
router
    .route("/login")
    .get(userController.indexLogin)
    .post(userController.newLogin);
router
    .route("/logout")
    .get(userController.logout)


module.exports=router