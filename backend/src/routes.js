const { Router } = require('express');

const StoreController = require('./controllers/StoreController');

const routes = Router();

routes.get('/stores', StoreController.index);
routes.get('/stores/:id', StoreController.show);
routes.post('/stores', StoreController.store);
routes.put('/stores/:id', StoreController.update);
routes.delete('/stores/:id', StoreController.delete);

module.exports = routes;