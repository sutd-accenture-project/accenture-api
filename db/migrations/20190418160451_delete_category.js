
exports.up = function(knex, Promise) {
  return knex.schema.dropTableIfExists('ticket_category');
};

exports.down = function(knex, Promise) {
  return knex.schema.createTable('ticket_category', table =>{
  	table.increments();
  	table.integer('ticket_id').unique().notNullable();
  	table.text('category').notNullable();
  });
};
