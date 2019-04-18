
exports.up = function(knex, Promise) {
  return knex.schema.table('user', table =>{
  	table.text('name');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('user', table =>{
  	table.dropColumn('name');
  });
};