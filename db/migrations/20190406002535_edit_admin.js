
exports.up = function(knex, Promise) {
  return knex.schema.table('admin', table =>{
  	table.dropColumn('date');
  	table.dropColumn('is_active');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('admin', table =>{
  	table.datetime('date').notNullable();
  	table.boolean('is_active').defaultTo(true);
  });
};