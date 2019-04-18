
exports.up = function(knex, Promise) {
  return knex.schema.dropTableIfExists('responses');
};

exports.down = function(knex, Promise) {
  return knex.schema.createTable('responses', table =>{
  	table.increments();
  	table.text('content').notNullable();
  	table.integer('ticket_id').notNullable();
  	table.datetime('date').notNullable();
  	table.boolean('admin').notNullable();
  	table.boolean('user').notNullable();
  });
};
