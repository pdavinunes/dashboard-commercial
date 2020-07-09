const { Router } = require('express');
const productRoutes = Router();
const ProductController = require('../controllers/ProductController');

/**
 * @swagger
 * /products:
 *   get:
 *     description: Retorna todas os produtos cadastrados
 *     tags:
 *       - products
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: OK.
 *         schema:
 *          $ref: '#/definitions/Products'
 */
productRoutes.get('/', ProductController.index);

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     description: Retorna um único produto
 *     tags:
 *       - products
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: ID de um produto
 *         in: path
 *         required: true
 *         type: number
 *     responses:
 *       400:
 *         description: Bad request. O ID de um produto deve ser um inteiro maior que 0.
 *       404:
 *          description: Not Found. O produto com o ID buscado não existe.
 *       200:
 *         description: OK.
 *         schema:
 *          $ref: '#/definitions/Product'
 * 
 */
productRoutes.get('/:id', ProductController.show);

/**
 * @swagger
 * /products:
 *   post:
 *     description: Cadastra um produto
 *     tags:
 *       - products
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: product
 *         description: product object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/ProductValidToSend'
 *     responses:
 *       201:
 *         description: Created.
 *       400:
 *         description: Bad request. Algum campo não foi inserido no corpo da requisição.
 * 
 */
productRoutes.post('/', ProductController.create);

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     description: Atualiza um produto
 *     tags:
 *       - products
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: ID de um produto
 *         in: path
 *         required: true
 *         type: number
 *       - name: product
 *         description: product object
 *         in: body
 *         required: true
 *         schema:
 *             $ref: '#/definitions/ProductValidToSend'
 *     responses:
 *       400:
 *         description: Bad request. O ID de um produto deve ser um inteiro maior que 0.
 *       404:
 *          description: Not Found. O produto com o ID buscado não existe.
 *       200:
 *         description: OK.
 *         schema:
 *          $ref: '#/definitions/Product'
 * 
 */
productRoutes.put('/:id', ProductController.update);
/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     description: Deleta um produto
 *     tags:
 *       - products
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: ID de um produto
 *         in: path
 *         required: true
 *         type: number
 *     responses:
 *       400:
 *         description: Bad request. O ID de um produto deve ser um inteiro maior que 0.
 *       404:
 *          description: Not Found. O produto com o ID buscado não existe.
 *       204:
 *         description: No Content.
 * 
 */
productRoutes.delete('/:id', ProductController.delete);

module.exports = productRoutes;

/**
 * @swagger
 * definitions:
 *   Product:
 *     type: object
 *     required:
 *       - id
 *       - name
 *       - description
 *       - price
 *       - store_id
 *     properties:
 *       id:
 *         type: number
 *       name:
 *         type: string
 *       description:
 *         type: string
 *       price:
 *          type: number
 *       comments:
 *          type: string
 *       store_id:
 *          type: number
 *       store_name:
 *          type: string
 *       created_at:
 *          type: number
 *       updated_at:
 *          type: number
 *   ProductValidToSend:
 *     type: object
 *     required:
 *       - id
 *       - name
 *       - description
 *       - price
 *       - store_id
 *     properties:
 *       name:
 *         type: string
 *       description:
 *         type: string
 *       price:
 *          type: number
 *       comments:
 *          type: string
 *       store_id:
 *          type: number
 *   Products:
 *     type: array
 *     items:
 *       $ref: '#/definitions/Product'
 */