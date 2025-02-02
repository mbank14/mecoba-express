/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('users', (tb) => {
    tb.increments('id').primary()
    tb.string('name').notNullable()
    tb.string('phone').notNullable()
    tb.string('username').nullable()
    tb.string('password').nullable()
  })
  .then(() => {
    return knex('users').insert([
        { name: "Komodos", phone: "088882828", username: "komodo", password: "komodo"},
        { name: "Jos", phone: "082342342",username: "lololo", password: "komodo"},
        { name: "Gandos", phone: "082342342", username: "kokoko", password: "komodo"}
    ])
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users')
};
