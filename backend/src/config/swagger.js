const express = require('express');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerRouter = express.Router();

const options = {
    swaggerDefinition: {
      info: {
        title: 'REST - Swagger',
        version: '1.0.0',
        description: 'REST API with Swagger doc',
        contact: {
          email: 'contact@danielpecos.com',
        },
      },
      tags: [
        {
          name: 'stores',
          description: 'Stores API',
        },
        {
            name: 'products',
            description: 'Products API',
        },
      ],
      schemes: ['http'],
      host: 'localhost:3333',
      basePath: '/api',
    },
    apis: ['./src/config/stocks.js', './src/routes/*'],
  };


const swaggerSpec = swaggerJSDoc(options);

swaggerRouter.get('/json', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

swaggerRouter.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

module.exports = swaggerRouter;
