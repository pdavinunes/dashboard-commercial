const { Router } = require('express');
const storeRoutes = Router();
const StoreController = require('../controllers/StoreController');

/**
 * @swagger
 * /stores:
 *   get:
 *     description: Retorna todas as lojas cadastradas
 *     tags:
 *       - stores
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: OK.
 *         schema:
 *          $ref: '#/definitions/Stores'
 */
storeRoutes.get('/', StoreController.index);

/**
 * @swagger
 * /stores/{id}:
 *   get:
 *     description: Retorna uma única loja
 *     tags:
 *       - stores
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: ID de uma loja
 *         in: path
 *         required: true
 *         type: number
 *     responses:
 *       400:
 *         description: Bad request. O ID de uma loja deve ser um inteiro maior que 0.
 *       404:
 *          description: Not Found. A loja com o ID buscado não existe.
 *       200:
 *         description: OK.
 *         schema:
 *          $ref: '#/definitions/Store'
 * 
 */
storeRoutes.get('/:id', StoreController.show);

/**
 * @swagger
 * /stores:
 *   post:
 *     description: Cadastra uma loja
 *     tags:
 *       - stores
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: store
 *         description: store object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/StoreValidToSend'
 *     responses:
 *       201:
 *         description: Created.
 *       400:
 *         description: Bad request. Algum campo não foi inserido no corpo da requisição.
 * 
 */
storeRoutes.post('/', StoreController.create);

/**
 * @swagger
 * /stores/{id}:
 *   put:
 *     description: Atualiza uma loja
 *     tags:
 *       - stores
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: ID de uma loja
 *         in: path
 *         required: true
 *         type: number
 *       - name: store
 *         description: store object
 *         in: body
 *         required: false
 *         schema:
 *           $ref: '#/definitions/StoreValidToSend'
 *     responses:
 *       400:
 *         description: Bad request. O ID de uma loja deve ser um inteiro maior que 0.
 *       404:
 *          description: Not Found. A loja com o ID buscado não existe.
 *       200:
 *         description: OK.
 *         schema:
 *          $ref: '#/definitions/Store'
 * 
 */
storeRoutes.put('/:id', StoreController.update);
/**
 * @swagger
 * /stores/{id}:
 *   delete:
 *     description: Deleta uma loja
 *     tags:
 *       - stores
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: ID de uma loja
 *         in: path
 *         required: true
 *         type: number
 *     responses:
 *       400:
 *         description: Bad request. O ID de uma loja deve ser um inteiro maior que 0.
 *       404:
 *          description: Not Found. A loja com o ID buscado não existe.
 *       204:
 *         description: No Content.
 * 
 */
storeRoutes.delete('/:id', StoreController.delete);

module.exports = storeRoutes;

/**
 * @swagger
 * definitions:
 *   Store:
 *     type: object
 *     required:
 *       - id
 *       - name
 *       - description
 *       - address
 *       - city 
 *       - uf
 *     properties:
 *       id:
 *         type: number
 *       name:
 *         type: string
 *       description:
 *         type: string
 *       address:
 *         type: string
 *       city:
 *         type: string
 *       uf:
 *         type: string
 *       created_at:
 *          type: number
 *       updated_at:
 *          type: number
 *   StoreValidToSend:
 *     type: object
 *     required:
 *       - name
 *       - description
 *       - address
 *       - city 
 *       - uf
 *     properties:
 *       name:
 *         type: string
 *       description:
 *         type: string
 *       address:
 *         type: string
 *       city:
 *         type: string
 *       uf:
 *         type: string
 *   Stores:
 *     type: array
 *     items:
 *       $ref: '#/definitions/Store'
 */