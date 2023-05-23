"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class AppointmentSchema extends Schema {
  up() {
    this.create("appointments", (table) => {
      table.increments("appointment_id")
      table.datetime("date").notNullable()
      table.time("time").notNullable()
      table
        .integer("patient_id")
        .unsigned()
        .references("patient_id")
        .inTable("patients")
        .onDelete("CASCADE")
        .notNullable()
      table.timestamps()
    });
  }

  down() {
    this.drop("appointments");
  }
}

module.exports = AppointmentSchema;
