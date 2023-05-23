'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Patient extends Model {
  static get primaryKey() {
    return 'patient_id'
  }

  psychologist() {
    return this.belongsTo('App/Models/Psychologist', 'psychologist_id', 'psychologist_id')
  }
}

module.exports = Patient
