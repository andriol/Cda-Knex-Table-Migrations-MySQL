exports.up = function (knex) {
  return knex.schema
    .createTable("cakes", (table) => {
      table.increments("id").primary();
      table.string("name").notNullable();
      table.string("description").notNullable();
      table.string("price").notNullable();
      table.json("categories").notNullable();
      table.timestamp("updated_at").defaultTo(knex.fn.now());
    })
    .createTable("images", (table) => {
      table.increments("id").primary();
      table.string("image").notNullable();
      table
        .integer("cake_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("cakes")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.timestamp("updated_at").defaultTo(knex.fn.now());
    });
};

exports.down = function (knex) {
  return knex.schema.dropTable("images").dropTable("cakes");
};
