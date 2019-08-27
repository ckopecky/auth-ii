
exports.up = function(knex) {
    return knex.schema.createTable('users', tbl => {
        tbl.increments();
        tbl.string('username')
            .notNullable();
        tbl.string('password')
            .notNullable();
        tbl.enum('department', ['Computer Science', 'iOS', 'Android', 'Web Development', 'Labs', 'X', 'Data Science', 'UX'])
    })
};

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists('users');
};
