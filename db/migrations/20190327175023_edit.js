
exports.up = function(knex, Promise) {
  return knex.schema.table('admin_department', table =>{
  	table.dropColumn('category');
  	table.dropColumn('ticket_id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('admin_department', table =>{
  	table.integer('ticket_id').notNullable();
  	table.text('category').notNullable();

  });
};