
exports.up = function(knex, Promise) {
  return knex.schema.createTable('tickets', table =>{
  	table.increments();
  	table.text('subject').notNullable();
  	table.integer('user_id').notNullable();
  	table.boolean('priority').notNullable();
  	table.boolean('unsolved').notNullable();
  	table.datetime('date_created').notNullable();
  	table.integer('admin_id');
  	table.text('message').notNullable();
  	table.text('requester').notNullable();
  	table.text('topic').notNullable();
  	table.text('user_email').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('tickets');
};
