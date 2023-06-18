const productModel = require("../model/productModel")

exports.productInsert = (req, res) => {
    productModel.create(req.body, (err, data) => {
        if (err) {
            res.status(500).json({ "status": "fail", "error": err })
        } else {
            res.status(200).json({ "status": "success", "data": data })
        }
    })
}

exports.allProducts = (req, res) => {
    productModel.find({}, (err, data) => {
        if (err) {
            res.status(500).json({ "status": "fail", "error": err })
        } else {
            res.status(200).json({ "status": "success", "data": data })
        }
    })
}

exports.updateProduct = (req, res) => {
    const product_id = req.headers.product_id
    productModel.updateOne({ product_id }, req.body, (err, data) => {
        if (err) {
            res.status(500).json({ "status": "fail", "error": err })
        } else {
            res.status(200).json({ "status": "success", "data": data })
        }
    })
}

exports.deleteProduct = async (req, res) => {
    const { productIds } = req.body;
    try {
        for (let i = 0; i < productIds.length; i++) {
            const productId = productIds[i];
            // Delete the product using the Product model
            await productModel.findByIdAndDelete(productId);
        }
        res.status(200).json({ message: 'Products deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting products', error });
    }

}