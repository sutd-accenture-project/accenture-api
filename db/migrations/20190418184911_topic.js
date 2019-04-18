
exports.up = function(knex, Promise) {
  return knex.schema.table('tickets', table =>{
  	table.text('topic');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('responses', table =>{
  	table.dropColumn('topic');
  });
};