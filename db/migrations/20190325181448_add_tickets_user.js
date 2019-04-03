
exports.up = function(knex, Promise) {
    return knex.schema.table('user', function(t) {
        t.string('tickets').notNull().defaultTo('');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.table('user', function(t) {
        t.dropColumn('tickets');
    });
};