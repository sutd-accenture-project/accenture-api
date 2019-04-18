
exports.up = function(knex, Promise) {
  return knex.schema.createTable('topics', table =>{
  	table.increments();
  	table.integer('ticket_id').unique().notNullable();
  	table.text('topic').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('topics');
};
