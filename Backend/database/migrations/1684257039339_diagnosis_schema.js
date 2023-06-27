"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class DiagnosisSchema extends Schema {
  up() {
    this.create("diagnoses", (table) => {
      table.increments("diagnosis_id");
      table
        .integer("patient_id")
        .unsigned()
        .references("patient_id")
        .inTable("patients")
        .onDelete("CASCADE")
        .notNullable();
      table.string("description");

      table.timestamps();
    });
  }

  down() {
    this.drop("diagnoses");
  }
}

module.exports = DiagnosisSchema;
