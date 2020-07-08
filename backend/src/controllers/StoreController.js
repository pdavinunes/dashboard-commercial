const knex = require('../database/connection');

const checkIfExists = async (id) => {
    const store = await knex('stores').select('*').where({id});
    return !!store.length;
}

module.exports = {
    async index(req, res) {
        const stores = await knex('stores').select('*');
        return res.json({stores}); 
    },

    async show(req, res) {
        const {id} = req.params;
        const store = await knex('stores').select('*').where({id});
        return !!store.length ? res.json({store}) : 
        res.status(404).json({"error":{"message":`Loja não encontrada para o id: ${id}.`}});
    },

    async create(req, res) {
        const {name, description, address, city, uf} = req.body;
        const store = {name, description, address, city, uf};
        const trx = await knex.transaction();
        await trx('stores').insert(store)
                .then((resp) => {
                    trx.commit();
                    return res.status(201).json({"store":{...store}})
                }).catch( e => {
                    return res.status(400).json({"error":{"message":`O campo '${e.column}' precisa ser preenchido.`}});
                })
    },

    async update(req, res) {
        const {id} = req.params;
        const store = {...req.body};
        
        await checkIfExists(id).then(async (resp) => {
            if(!resp) return res.status(404).json({"error":{"message":`Loja não encontrada para o id: ${id}.`}});
            
            const updated_at = new Date();
            const trx = await knex.transaction();
            await trx('stores').where({id}).update({...store, updated_at}, ['*'])
                .then((store) => {
                    trx.commit();
                    res.json({store})
                }).catch( _ => {
                    return res.status(400).json({"error":{"message":"Não foi possivel atualizar, verifique os dados passados."}});
                })
        })
    },

    async delete(req, res) {
        const {id} = req.params;

        await checkIfExists(id).then(async (resp) => {
            if(!resp) return res.status(404).json({"error":{"message":`Loja não encontrada para o id: ${id}.`}});
            
            const trx = await knex.transaction();
            await trx('stores').where({id}).del();
            await trx.commit();

            res.status(204);
        })
    }
}
