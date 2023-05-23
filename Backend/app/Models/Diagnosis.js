'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Diagnosis extends Model {
  static get primaryKey() {
    return null
  }

  static get incrementing() {
    return false
  }

  static get createdAtColumn() {
    return null
  }

  static get updatedAtColumn() {
    return null
  }

  patient() {
    return this.belongsTo('App/Models/Patient', 'patient_id', 'patient_id')
  }

  pathology() {
    return this.belongsTo('App/Models/Pathology', 'pathology_id', 'pathology_id')
  }
}

module.exports = Diagnosis
