
exports.up = function(knex, Promise) {
  return knex.schema.table('tickets', table =>{
  	table.text('user_email');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('tickets', table =>{
  	table.dropColumn('user_email');
  });
};