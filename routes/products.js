const db = require('./../utils/mongoconnection');
const formValidationMiddleware = require('./../utils/middlewares/form-validation-middleware');
const { check } = require('express-validator');

const productController = require('./../controller/productController');

module.exports = function (app) {
    app.post("/create-product", [
        check("product_name").not().isEmpty().withMessage("Product name is required"),
        check("image").not().isEmpty().withMessage("image is required"),
        check("product_description").not().isEmpty().withMessage("product Description is required"),
        check("quantity").not().isEmpty().withMessage("Quantity is required"),
        check("unitprice").not().isEmpty().withMessage("Price is required"),

    ], formValidationMiddleware, productController.createProduct);
}
