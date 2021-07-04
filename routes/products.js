const db = require('./../utils/mongoconnection');
const diskStorage = require('./../utils/deskstorage');
const formValidationMiddleware = require('./../utils/middlewares/form-validation-middleware');
const { check } = require('express-validator');

const productController = require('./../controller/productController');

module.exports = function (app) {
    app.post("/create-product", diskStorage.single('image'), [
        check("product_name").not().isEmpty().withMessage("Product name is required"),
        check("product_description").not().isEmpty().withMessage("product Description is required"),
        check("quantity").not().isEmpty().withMessage("Quantity is required"),
        check("unitprice").not().isEmpty().withMessage("Price is required"),
    ], formValidationMiddleware, productController.createProduct);

    app.post("/fetch-products", productController.fetchProducts);

    app.post("/edit-product", diskStorage.single('image'), [
        check("product_name").not().isEmpty().withMessage("Product name is required"),
        check("product_description").not().isEmpty().withMessage("product Description is required"),
        check("quantity").not().isEmpty().withMessage("Quantity is required"),
        check("unitprice").not().isEmpty().withMessage("Price is required"),
    ], formValidationMiddleware, productController.editProduct);

    app.post("/delete-product", [
        check("id").not().isEmpty().withMessage("Product id is required")
    ], formValidationMiddleware, productController.deleteProduct);
}
