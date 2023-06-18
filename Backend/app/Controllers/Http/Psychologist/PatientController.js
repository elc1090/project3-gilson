"use strict";

const Patient = use("App/Models/Patient");

class PatientController {
  async index({ auth, response }) {
    try {
      const patients = await Patient.query()
        .where("psychologist_id", auth.user.id)
        .fetch();
      return response.json({ patients });
    } catch (error) {
      return response
        .status(500)
        .send({ message: "Erro ao buscar os pacientes" });
    }
  }

  async store({ request, response, auth }) {
    try {
      const { name, email, cpf } = request.only(["name", "email", "cpf"]);

      const patient = new Patient();
      patient.name = name;
      patient.email = email;
      patient.cpf = cpf;
      patient.psychologist_id = auth.user.id;
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
