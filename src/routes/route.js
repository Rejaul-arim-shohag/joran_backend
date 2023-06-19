const express = require('express');
const router = express.Router();

// controller
const userController = require("../controller/userController");
const productController = require("../controller/productController");
const userVerifyMiddleware = require('../middleware/userVerifyMiddleware');

//user endpoints
router.post("/user_signup", userController.userSignup);
router.post("/user_login", userController.UserLogin);
router.post("/user_logout",userVerifyMiddleware, userController.UserLogout);

//product endpoints
router.post("/productCreate",userVerifyMiddleware, productController.productInsert);
router.get("/allProducts",userVerifyMiddleware, productController.allProducts);
router.post(`/findProductById`,userVerifyMiddleware, productController.findProductById);
router.post("/updateProduct",userVerifyMiddleware, productController.updateProduct);
router.post("/deleteProduct",userVerifyMiddleware, productController.deleteProduct);



module.exports=router;