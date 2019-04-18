
exports.up = function(knex, Promise) {
  return knex.schema.table('tickets', table =>{
  	table.text('message');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('tickets', table =>{
  	table.dropColumn('message');
  });
};