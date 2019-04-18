
exports.up = function(knex, Promise) {
  return knex.schema.dropTableIfExists('admin_department');
};

exports.down = function(knex, Promise) {
  return knex.schema.createTable('ticket_category', table =>{
  	table.increments();
  	table.integer('admin_id').unique().notNullable();
  	table.text('department').notNullable();
  });
};
