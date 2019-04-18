
exports.up = function(knex, Promise) {
  return knex.schema.table('responses', table =>{
  	table.integer('ticket_id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('responses', table =>{
  	table.dropColumn('ticket_id');
  });
};