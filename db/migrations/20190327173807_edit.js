
exports.up = function(knex, Promise) {
  return knex.schema.table('admin_department', table =>{
  	table.dropColumn('department');
  	table.dropColumn('admin_id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('admin_department', table =>{
  	table.text('admin_id').notNullable();
  	table.integer('department').notNullable();
  });
};