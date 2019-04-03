
exports.up = function(knex, Promise) {
  return knex.schema.table('admin_department', table =>{
  	table.integer('admin_id').notNullable();
  	table.text('department').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('admin_department', table =>{
  	table.dropColumn('department');
  	table.dropColumn('admin_id');
  });
};