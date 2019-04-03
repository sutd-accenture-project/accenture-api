
exports.up = function(knex, Promise) {
  return knex.schema.table('admin_department', table =>{
  	table.dropColumn('department');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('admin_department', table =>{
  	table.text('department').notNullable();
  });
};