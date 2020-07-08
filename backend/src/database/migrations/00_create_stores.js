exports.up =  async function (knex) {
    return knex.schema.createTable('stores', table => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('description').notNullable();
        table.string('address').notNullable();
        table.string('city').notNullable();
        table.string('uf').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    })
}

exports.down = async function (knex) {
    return knex.schema.dropTable('stores');
}