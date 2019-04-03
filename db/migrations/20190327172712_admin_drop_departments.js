
exports.up = function(knex, Promise) {
  return knex.schema.table('admin', table =>{
  	table.dropColumn('departments');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('admin', table =>{
  	table.text('departments').notNullable();
  });
};
