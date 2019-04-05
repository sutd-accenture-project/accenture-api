
exports.up = function(knex, Promise) {
  return knex.schema.table('admin_department', table =>{
  	table.dropColumn('is_active');
  	table.dropColumn('tickets');
  	table.dropColumn('password');
  	table.dropColumn('email');
  	table.dropColumn('date');
  	table.text('subject').notNullable();
  	table.integer('user_id').notNullable();
  	table.boolean('priority').notNullable();
  	table.boolean('unsolved').notNullable();
  	table.datetime('date_created').notNullable();
  	table.integer('admin_id').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('admin_department', table =>{
  	table.boolean('is_active');
  	table.text('tickets');
  	table.text('password');
  	table.text('email');
  	table.datetime('date');
  	table.dropColumn('subject');
  	table.dropColumn('user_id');
  	table.dropColumn('priority');
  	table.dropColumn('unsolved');
  	table.dropColumn('date_created');
  	table.dropColumn('admin_id');
  });
};