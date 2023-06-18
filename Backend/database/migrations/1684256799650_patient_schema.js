"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class PatientSchema extends Schema {
  up() {
    this.create("patients", (table) => {
      table.increments("patient_id").primary()
      table.string("name").notNullable()
      table.string("email").notNullable()
      table.string("cpf")
      table
        .integer("psychologist_id")
        .unsigned()
        .references("user_id")
        .inTable("psychologists")
        .onDelete("CASCADE");
      table.timestamps();
    });
  }

  down() {
    this.drop("patients");
  }
}

module.exports = PatientSchema;
