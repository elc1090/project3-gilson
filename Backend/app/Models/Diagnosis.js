'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Diagnosis extends Model {
  static get primaryKey() {
    return 'diagnosis_id'
  }

  patient() {
    return this.belongsTo('App/Models/Patient', 'patient_id', 'patient_id')
  }
}

module.exports = Diagnosis
