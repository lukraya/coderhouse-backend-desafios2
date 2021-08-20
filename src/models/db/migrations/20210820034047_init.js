exports.up = function(knex) {
    return knex.schema.createTable('product', (table)=>{
        table.increments('id')
        table.string('title').notNullable().unique()
        table.integer('price').notNullable()
        table.string('thumbnail').notNullable().unique()
        table.timestamps(true, true)
    })
};
  
exports.down = function(knex) {
    return knex.schema.dropTable('product')
};
  