const mongoose = require("mongoose");
const Schema = mongoose.Schema({
    product_name: { type: String },
    product_id:{ type: String, unique: true},
    price: { type: Number },
    category_name: { type: String, },
    image: { type: String, },
    createDate: { type: Date, default: Date.now() },
}, { versionKey: false });

const productModel = mongoose.model("products", Schema);
module.exports = productModel;