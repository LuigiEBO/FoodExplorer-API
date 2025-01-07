exports.up = (knex) =>
  knex.schema.createTable("tagsDesserts", (table) => {
    table.increments("id")
    table
      .integer("dessert_id")
      .references("id")
      .inTable("desserts")
      .onDelete("CASCADE")
    table.text("name")
  })

exports.down = (knex) => knex.schema.dropTable("tagsDesserts")