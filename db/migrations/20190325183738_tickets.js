
exports.up = function(knex, Promise) {
  return knex.schema.createTable('tickets', table =>{
  	table.increments();
  	table.text('email').unique().notNullable();
  	table.text('password').notNullable();
  	table.datetime('date').notNullable();
  	table.boolean('is_active').notNullable().defaultTo(true);
  	table.text('tickets').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('tickets');
};
