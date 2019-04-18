
exports.up = function(knex, Promise) {
  return knex.schema.createTable('responses', table =>{
  	table.increments();
  	table.text('message').notNullable();
  	table.integer('ticket_id').notNullable();
  	table.datetime('date').notNullable();
  	table.text('user_name').notNullable();
  	table.text('admin_name').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('responses');
};
