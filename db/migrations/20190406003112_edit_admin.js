
exports.up = function(knex, Promise) {
  return knex.schema.table('admin', table =>{
  	table.datetime('date_created');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('admin', table =>{
  	table.dropColumn('date_created');
  });
};