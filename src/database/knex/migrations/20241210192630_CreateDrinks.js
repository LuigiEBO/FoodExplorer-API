exports.up = (knex) =>
  knex.schema.createTable("drinks", (table) => {
    table.increments("id")
    table.text("name").notNullable()
    table.text("price").notNullable()
    table.text("description").notNullable()
    table.text("avatar").default(null)

    table.timestamp("created_at").default(knex.fn.now())
    table.timestamp("updated_at").default(knex.fn.now())
  })

exports.down = (knex) => knex.schema.dropTable("drinks")
