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
      table
        .integer("pathology_id")
        .unsigned()
        .references("pathology_id")
        .inTable("pathologies")
        .onDelete("CASCADE")
        .notNullable();
      table.enum("level", ["mild", "moderate", "severe"]).notNullable();

      table.timestamps();
    });
  }

  down() {
    this.drop("diagnoses");
  }
}

module.exports = DiagnosisSchema;
