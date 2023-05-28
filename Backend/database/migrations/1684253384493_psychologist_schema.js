"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class PsychologistSchema extends Schema {
  up() {
    this.create("psychologists", (table) => {
      table.increments('psychologist_id').primary();
      table
        .integer("user_id")
        .unsigned()
        .references("id")
        .inTable("users")
        .onDelete("CASCADE");
      table.string("cpf", 20).notNullable();
      table.string("crp", 40).notNullable();
      table.string("name", 255).notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("psychologists");
  }
}

module.exports = PsychologistSchema;
