
exports.up = function(knex, Promise) {
  return knex.schema.table('tickets', table =>{
  	table.text('topic').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('tickets', table =>{
  	table.dropColumn('topic').notNullable();
  });
};