
exports.up = function(knex, Promise) {
  return knex.schema.table('user', table =>{
  	table.dropColumn('created_at');
  	table.dropColumn('is_active');
  	table.dropColumn('tickets');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('user', table =>{
  	table.datetime('created_at').notNullable();
  	table.boolean('is_active').defaultTo(true);
  	table.text('tickets').notNullable();
  });
};