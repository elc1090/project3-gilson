'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Pathology extends Model {
  static get primaryKey() {
    return 'pathology_id'
  }
}

module.exports = Pathology
