
exports.up = function(knex, Promise) {
  return knex.schema.createTable('responses', table =>{
  	table.increments();
  	table.text('message').notNullable();
  	table.integer('ticket_id').notNullable();
  	table.datetime('date').notNullable();
  	table.text('name').notNullable();
  	table.text('role').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('responses');
};
