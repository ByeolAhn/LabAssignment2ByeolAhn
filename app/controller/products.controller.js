const ProductSchema = require('../models/products.model');

//Get all Products
exports.getAll = (req, res) => {
    ProductSchema.find().then(
        prod => {
            res.send(prod)
        }

    ).catch(err => {
        res.status(500).send({
            'message': 'Something went wrong!!',
            'error': err
        })
    });
}


//Get Product by id
exports.productByID = (req, res) => {
    ProductSchema.findById(req.params.id).then(
        todos => {
            res.send(todos)
        }
    ).catch(err => {
        console.log(err);
    })
}


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
exports.updateById = (req, res) => {
    if (!req.body.name) {
        return res.status(400).send({
            'message': 'Please enter the name'
        })
    }
    ProductSchema.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        published: req.body.published,
        category: req.body.category
    }, { new: true }).then(prod => {
        if (!prod) {
            res.status(500).send({
                'message': 'Product not updated. Are you sure it exists?',
                'error': err
            })
        }
        res.send(prod)
    }).catch(err => {
        res.status(500).send({
            'message': 'Something went wrong!!',
            'error': err
        })
    });
}

//Remove Product by id
exports.removeById = (req, res) => {
    ProductSchema.findByIdAndRemove(req.params.id).then(
        prod => {
            if (!prod) {
                return res.status(404).send({
                    'message': 'There is no product by that id',
                })
            }
            res.send({
                'message': 'Product deleted sucessfully.'
            })
        }
    ).catch(err => {
        res.status(500).send({
            'message': 'Something went wrong!!',
            'error': err
        })
    });
}


