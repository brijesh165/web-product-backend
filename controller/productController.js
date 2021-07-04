const db = require('./../context/contextManager');

const _controller = {};

/**
 * 
 * @param {*} product_name 
 * @param {*} product_description 
 * @param {*} quantity
 * @param {*} unitprice 
 * @param {*} image
 */
_controller.createProduct = async function (req, res) {
    try {
        const file = req.file;
        req.body.image = 'images/' + file.filename;

        const product = await db.productsModel.create(req.body);

        res.send({
            status: 200,
            product: product
        })
    } catch (err) {
        console.log("Create Product Error");
    }
}

_controller.fetchProducts = async function (req, res, next) {
    try {
        const products = await db.productsModel.find();

        res.send({
            status: 200,
            products: products
        })
    } catch (error) {
        console.log("Fetch Product Error: ", error)
    }
}

/**
 * 
 * @param {*} product_name 
 * @param {*} product_description 
 * @param {*} quantity
 * @param {*} unitprice 
 * @param {*} image
 */
_controller.editProduct = async function (req, res) {
    try {

        const file = req.file;

        const editParams = {
            product_name: req.body.product_name,
            product_description: req.body.product_description,
            quantity: req.body.quantity,
            unitprice: req.body.unitprice,
            image: 'images/' + file.filename,
        }
        const product = await db.productsModel.findOneAndUpdate({ _id: req.body._id }, editParams, { new: true });

        res.send({
            status: 200,
            product: product
        })
    } catch (error) {
        console.log("Edit Product Error: ", error)
    }
}

/**
 * 
 * @param {*} id 
 */
_controller.deleteProduct = async function (req, res) {
    try {

        fs.unlinkSync(req.body.imagepath);
        await db.productsModel.findByIdAndDelete(req.body.id);


        res.send({
            status: 200,
            id: req.body.id
        })
    } catch (error) {
        console.log("Delete Product Error: ", error)
    }
}


module.exports = _controller;