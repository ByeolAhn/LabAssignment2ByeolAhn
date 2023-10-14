var express = require('express');
var router = express.Router();

let productController = require('../controller/products.controller');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/products', productController.getAll);
router.get('/products/:id', productController.productByID, productController.read);
router.post('/products', productController.addNew);
router.put('/products/:id', productController.updateById);
router.delete('/products/:id', productController.removeById);



module.exports = router;
