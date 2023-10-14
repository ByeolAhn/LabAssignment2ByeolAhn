const ProductSchema = require('../models/products.model');

//Get all Products
exports.getAll = async (req, res, next) => {
    try {
        let list = await ProductSchema.find({});
        res.json(list);
    } catch (error) {
        next(error);
    }
}

//Get Product by id
exports.productByID = async (req, res, next) => {
    try {
        let productId = req.params.productId;
        req.user = await ProductSchema.findOne({ _id: productId });
        next();
    } catch (error) {
        console.log(error);
        next(error);
    }
};

exports.read = function (req, res) {
    res.json(req.user);
};

//Add new Product
module.exports.addNew = async (req, res, next) => {
    try {
        let newProduct = new ProductSchema(req.body);

        let result = await ProductSchema.create(newProduct);
        res.json(
            {
                success: true,
                message: "Product created sucessfully."
            }
        );
    } catch (error) {
        console.log(error);
        next(error)
    }
}

//Update Product by id
exports.updateById = async (req, res, next) => {
    try {
        let productId = req.params.productId;
        let updatedProduct = ProductSchema(req.body);
        updatedProduct._id = productId;

        let result = await ProductSchema.updateOne({ _id: productId }, updatedProduct);
        console.log(result);
        if (result.modifiedCount > 0) {
            res.json(
                {
                    success: true,
                    message: "Product updated sucessfully."
                }
            );
        }
        else {
            throw new Error('Product not updated. Are you sure it exists?')
        }
    } catch (error) {
        next(error)
    }
}

//Remove Product by id
module.exports.removeById = async (req, res, next) => {
    try {
        let productId = req.params.productId;
        let result = await ProductSchema.deleteOne({ _id: id });
        console.log("====> Result: ", result);
        if (result.deletedCount > 0) {
            res.json(
                {
                    success: true,
                    message: "Product deleted sucessfully."
                }
            )
        }
        else {
            throw new Error('Product not deleted. Are you sure it exists?')
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
}
