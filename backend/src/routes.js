const { Router } = require('express');
const swaggerRouter = require('./config/swagger');

const storeRouter = require('./routes/StoreRoutes');
const productRouter = require('./routes/ProductRoutes');

const routes = Router();

routes.use('/api/stores', storeRouter);
routes.use('/api/products', productRouter);


routes.use('/api/docs', swaggerRouter);

module.exports = routes;