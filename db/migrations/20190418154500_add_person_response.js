
exports.up = function(knex, Promise) {
  return knex.schema.table('responses', table =>{
  	table.boolean('admin');
  	table.boolean('user');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('responses', table =>{
  	table.dropColumn('admin');
  	table.dropColumn('user');
  });
};