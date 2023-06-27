"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class DemandSchema extends Schema {
  up() {
    this.create("demands", (table) => {
      table.increments("demand_id");
      table.string("title").notNullable();
      table.string("description");
      table.boolean("addressed").defaultTo(false);
      table
        .integer("patient_id")
        .unsigned()
        .references("patient_id")
        .inTable("patients")
        .onDelete("CASCADE")
        .notNullable();
      table
        .integer("appointment_id")
        .unsigned()
        .references("appointment_id")
        .inTable("appointments")
        .onDelete("CASCADE")
      table.enum("relevance", ["low", "medium", "high"]).notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("demands");
  }
}

module.exports = DemandSchema;
