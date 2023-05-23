'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Psychologist extends Model {
  static get primaryKey() {
    return ['user_id', 'psychologist_id']
  }

  static get incrementing() {
    return false
  }

  user() {
    return this.belongsTo('App/Models/User')
  }
}

module.exports = Psychologist
