
exports.up = function(knex, Promise) {
  return knex.schema.createTable('test', table =>{
  	table.increments();
  	table.text('name').unique().notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('test');
};