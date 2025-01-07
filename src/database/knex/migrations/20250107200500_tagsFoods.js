exports.up = (knex) =>
  knex.schema.createTable("tagsFoods", (table) => {
    table.increments("id")
    table.integer("food_id").references("id").inTable("foods").onDelete("CASCADE")
    table.text("name")
  })

exports.down = (knex) => knex.schema.dropTable("tagsFoods")
