const { Router } = require('express');

const StoreController = require('./controllers/StoreController');
const ProductController = require('./controllers/ProductController');

const routes = Router();

routes.get('/stores', StoreController.index);
routes.get('/stores/:id', StoreController.show);
routes.post('/stores', StoreController.create);
routes.put('/stores/:id', StoreController.update);
routes.delete('/stores/:id', StoreController.delete);

routes.get('/products', ProductController.index);
routes.get('/products/:id', ProductController.show);
routes.post('/products', ProductController.create);
routes.put('/products/:id', ProductController.update);
routes.delete('/products/:id', ProductController.delete);

module.exports = routes;