
exports.up = function(knex, Promise) {
  return knex.schema.createTable('responses', table =>{
  	table.increments();
  	table.text('ticket_id').unique().notNullable();
  	table.text('content').notNullable();
  	table.datetime('date').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('responses');
};
