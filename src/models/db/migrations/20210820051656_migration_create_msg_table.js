exports.up = function(knex) {
    return knex.schema.createTable('messages', (table)=>{
        table.increments('id')
        table.string('email').notNullable()
        table.string('mensaje').notNullable()
        table.timestamps(true, true)
    })  
};

exports.down = function(knex) {
    return knex.schema.dropTable('messages')  
};
