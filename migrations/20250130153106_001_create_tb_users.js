/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('users', (tb) => {
    tb.increments('id').primary()
    tb.string('name').notNullable()
    tb.string('phone').notNullable()
  })
  .then(() => {
    return knex('users').insert([
        { name: "Komodos", phone: "088882828"},
        { name: "Jos", phone: "082342342"},
        { name: "Gandos", phone: "082342342"}
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
