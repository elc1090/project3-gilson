'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Demand extends Model {
  static get primaryKey() {
    return 'demand_id'
  }

  patient() {
    return this.belongsTo('App/Models/Patient', 'patient_id', 'patient_id')
  }

  appointment() {
    return this.belongsTo('App/Models/Appointment', 'appointment_id', 'appointment_id')
  }
}

module.exports = Demand
