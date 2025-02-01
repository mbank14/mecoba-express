/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('notes', (tb)=>{
    tb.increments('id').primary()
    tb.integer('user_id').unsigned()
    tb.string('text').notNullable
    tb.string('status')
    tb.foreign('user_id').references('id').inTable('users').onDelete('CASCADE').onUpdate('CASCADE')
  })
  .then(() => console.log('tabel note dibuat'))
  .then(() => {
    return knex('notes').insert([
        {
            id: 1, user_id: 1, text: "Besok makan", status: "Done"
        }
    ])
  })
  .catch(err => console.log(err))
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('notes')
};
