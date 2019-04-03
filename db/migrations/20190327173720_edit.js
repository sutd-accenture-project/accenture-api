
exports.up = function(knex, Promise) {
  return knex.schema.table('admin_department', table =>{
  	table.integer('department').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('admin_department', table =>{
  	table.dropColumn('department');
  });
};