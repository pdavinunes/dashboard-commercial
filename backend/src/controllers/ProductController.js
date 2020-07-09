const knex = require('../database/connection');

const checkIfExists = async (id, res) => {
    const product = await knex('products').select('*').where({id}).catch(_ => {
        return res.status(400).json({"error":{"message":`Formato inválido de requisição: ${id}`}});
        });
    return !!product.length;
}

module.exports = {
    async index(req, res) {
        knex.select(['products.*', {store_name: 'stores.name'}])
            .from('products').innerJoin('stores','stores.id','products.store_id')
            .then((products)=> {
               return res.json({products})
            })
    },

    async show(req, res) {
        const {id} = req.params;
        const product = await knex.select(['products.*', {store_name: 'stores.name'}])
                .from('products').innerJoin('stores','stores.id','products.store_id')
                    .where('products.id',id).catch(e => {
                    console.log(e);
                return res.status(400).json({"error":{"message":`Formato inválido de requisição: ${id}`}});
            });
        return !!product.length ? res.json({product}) : 
        res.status(404).json({"error":{"message":`Produto não encontrado para o id: ${id}.`}});
    },

    async create(req, res) {
        const {name, description, price, comments, store_id} = req.body;
        const product = {name, description, price, comments, store_id};
        const trx = await knex.transaction();
        await trx('products').insert(product)
                .then((resp) => {
                    trx.commit();
                    return res.status(201).json({"product":{...product}})
                }).catch( e => {
                    return res.status(400).json({"error":{"message":`O campo '${e.column}' precisa ser preenchido.`}});
                })
    },

    async update(req, res) {
        const {id} = req.params;
        const product = {...req.body};
        
        await checkIfExists(id, res).then(async (resp) => {
            if(!resp) return res.status(404).json({"error":{"message":`Produto não encontrado para o id: ${id}.`}});
            
            const updated_at = new Date();
            const trx = await knex.transaction();
            await trx('products').where({id}).update({...product, updated_at}, ['*'])
                .then((product) => {
                    trx.commit();
                    res.json({product})
                }).catch( _ => {
                    return res.status(400).json({"error":{"message":"Não foi possivel atualizar, verifique os dados passados."}});
                })
        })
    },

    async delete(req, res) {
        const {id} = req.params;

        await checkIfExists(id, res).then(async (resp) => {
            if(!resp) return res.status(404).json({"error":{"message":`Produto não encontrado para o id: ${id}.`}});
            
            const trx = await knex.transaction();
            await trx('products').where({id}).del();
            await trx.commit();

            res.status(204);
        })
    }
}
