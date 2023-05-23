'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PathologySchema extends Schema {
  up() {
    this.create('pathologies', (table) => {
      table.increments('pathology_id').primary()
      table.string('name').notNullable()
      table.string('description')
      table.timestamps()
    })
  }

  down() {
    this.drop('pathologies')
  }
}

module.exports = PathologySchema
