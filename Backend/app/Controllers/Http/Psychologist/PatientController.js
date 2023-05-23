"use strict";

const Patient = use("App/Models/Patient");

class PatientController {
  async index({ response }) {
    try {
      const patients = await Patient.query().fetch();
      return response.send(patients);
    } catch (error) {
      return response
        .status(500)
        .send({ message: "Erro ao buscar os pacientes" });
    }
  }

  async store({ request, response }) {
    try {
      const { name, email, cpf, psychologist_id } = request.only([
        "name",
        "email",
        "cpf",
        "psychologist_id",
      ]);

      const patient = new Patient();
      patient.name = name;
      patient.email = email;
      patient.cpf = cpf;
      patient.psychologist_id = psychologist_id;
      await patient.save();

      return response
        .status(201)
        .send({ message: "Paciente criado com sucesso" });
    } catch (error) {
      return response.status(500).send({ message: "Erro ao criar o paciente" });
    }
  }
}

module.exports = PatientController;
