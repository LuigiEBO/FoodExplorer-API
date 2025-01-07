exports.up = (knex) =>
  knex.schema.createTable("tagsDrinks", (table) => {
    table.increments("id")
    table
      .integer("fdrink_id")
      .references("id")
      .inTable("drinks")
      .onDelete("CASCADE")
    table.text("name")
  })

exports.down = (knex) => knex.schema.dropTable("tagsDrinks")
