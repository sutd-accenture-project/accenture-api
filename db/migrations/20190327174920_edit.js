
exports.up = function(knex, Promise) {
  return knex.schema.createTable('ticket_category', table =>{
  	table.integer('ticket_id').notNullable();
  	table.text('category').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.createTable('ticket_category', table =>{
  	table.dropColumn('category');
  	table.dropColumn('ticket_id');
  });
};