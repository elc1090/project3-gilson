'use strict';

const Diagnosis = use('App/Models/Diagnosis');

class DiagnosisController {
  async index({ response }) {
    try {
      const diagnoses = await Diagnosis.query().fetch();
      return response.send(diagnoses);
    } catch (error) {
      return response.status(500).send({ message: 'Erro ao buscar os diagnósticos' });
    }
  }

  async store({ request, response }) {
    try {
      const { patient_id, pathology_id, level } = request.only(['patient_id', 'pathology_id', 'level']);

      const diagnosis = new Diagnosis();
      diagnosis.patient_id = patient_id;
      diagnosis.pathology_id = pathology_id;
      diagnosis.level = level;
      await diagnosis.save();

      return response.status(201).send({ message: 'Diagnóstico criado com sucesso' });
    } catch (error) {
      return response.status(500).send({ message: 'Erro ao criar o diagnóstico' });
    }
  }
}

module.exports = DiagnosisController;
