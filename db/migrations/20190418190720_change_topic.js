
exports.up = function(knex, Promise) {
  return knex.schema.table('tickets', table =>{
  	table.dropColumn('topic');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('tickets', table =>{
  	table.text('topic');
  });
};