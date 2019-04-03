
exports.up = function(knex, Promise) {
  return knex.schema.table('admin', table =>{
  	table.dropColumn('tickets');
  	table.text('departments').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('admin', table =>{
  	table.dropColumn('departments');
  	table.text('tickets').notNullable();
  });
};
