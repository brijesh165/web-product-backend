let mongoose = require('mongoose');

let Products = new mongoose.Schema({
    product_name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true
    },
    product_description: {
        type: String,
        required: true,
    },
    quantity: {
        type: String,
        required: true,
    },
    unitprice: {
        type: String,
        required: true,
    },
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    },
    toJSON: {
        transform(doc, ret) {
            delete ret.password;
        },
    },
    versionKey: false
});

module.exports = mongoose.model('Products', Products);