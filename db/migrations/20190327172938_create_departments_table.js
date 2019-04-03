
exports.up = function(knex, Promise) {
  return knex.schema.createTable('admin_department', table =>{
  	table.increments();
  	table.text('admin_id').unique().notNullable();
  	table.text('department').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('admin_department');
};