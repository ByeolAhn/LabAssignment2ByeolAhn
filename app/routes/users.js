


module.exports = (router) => {
  const productController = require('../controller/products.controller');

  router.get('/products', productController.getAll);
  router.get('/products/:id', productController.productByID);
  router.post('/products', productController.addNew);
  router.put('/products/:id', productController.updateById);
  router.delete('/products/:id', productController.removeById);

}