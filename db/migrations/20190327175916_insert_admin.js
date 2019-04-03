
exports.up = function(knex, Promise) {
  return knex('admin')
  .insert({ email: 'test@accenture.com',password: 'LOLgg9',date: new Date()})
};

exports.down = function(knex, Promise) {
  return knex.schema.table('admin', table =>{
  	knex('admin')
  .where({ email: 'test@accenture.com' })
  .del()

  });
};