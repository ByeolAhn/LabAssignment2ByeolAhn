


module.exports = (router) => {
  const productController = require('../controller/products.controller');

  router.get('/api/products', productController.getAll);
  router.get('/api/products/:id', productController.productByID);
  router.post('/api/products', productController.addNew);
  router.put('/api/products/:id', productController.updateById);
  router.delete('/api/products/:id', productController.removeById);

}