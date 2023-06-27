"use strict";

const Diagnosis = use("App/Models/Diagnosis");

class DiagnosisController {
  async index({ response }) {
    try {
      const diagnoses = await Diagnosis.query().fetch();
      return response.send(diagnoses);
    } catch (error) {
      return response
        .status(500)
        .send({ message: "Erro ao buscar os diagnósticos" });
    }
  }

  async store({ request, response }) {
    try {
      const { patient_id, description } = request.only([
        "patient_id",
        "description",
      ]);

      const diagnosis = new Diagnosis();
      diagnosis.patient_id = patient_id;
      diagnosis.description = description;
      await diagnosis.save();

      return response
        .status(201)
        .send({ message: "Diagnóstico criado com sucesso" });
    } catch (error) {
      return response
        .status(500)
        .send({ message: "Erro ao criar o diagnóstico" });
    }
  }

  async update({ params, request, response }) {
    try {
      const { patient_id, description } = request.only([
        "patient_id",
        "description",
      ]);
      const diagnosis = await Diagnosis.find(params.id);

      if (!diagnosis) {
        diagnosis = new Diagnosis();
        diagnosis.patient_id = patient_id;
        diagnosis.description = description;
        await diagnosis.save();
      } else {
        diagnosis.patient_id = patient_id;
        diagnosis.description = description;
        await diagnosis.save();
      }

      return response
        .status(200)
        .send({ message: "Diagnóstico atualizado com sucesso" });
    } catch (error) {
      return response
        .status(500)
        .send({ message: "Erro ao atualizar o diagnóstico" });
    }
  }
}

module.exports = DiagnosisController;
