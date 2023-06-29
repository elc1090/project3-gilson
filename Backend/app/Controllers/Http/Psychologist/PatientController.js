"use strict";

const Patient = use("App/Models/Patient");
const Demand = use("App/Models/Demand");
const Diagnosis = use("App/Models/Diagnosis");

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
      const { name, email, cpf, phone, gender, birth_date } = request.only([
        "name",
        "email",
        "cpf",
        "phone",
        "gender",
        "birth_date",
      ]);

      const patient = new Patient();
      patient.name = name;
      patient.email = email;
      patient.cpf = cpf;
      patient.psychologist_id = auth.user.id;
      patient.phone = phone;
      patient.gender = gender;
      patient.birth_date = birth_date;
      await patient.save();

      return response
        .status(201)
        .send({ message: "Paciente criado com sucesso" });
    } catch (error) {
      return response.status(500).send({ message: "Erro ao criar o paciente" });
    }
  }

  async show({ params, response }) {
    try {
      const patient = await Patient.find(params.id);

      const diagnosis = await Diagnosis.query()
        .where("patient_id", patient.patient_id)
        .fetch();

      if (!patient) {
        return response
          .status(404)
          .send({ message: "Paciente não encontrado" });
      }

      const patientData = patient.toJSON();
      patientData.diagnosis = diagnosis.toJSON();

      return response.json({ patient: patientData });
    } catch (error) {
      return response
        .status(500)
        .send({ message: "Erro ao buscar o paciente" });
    }
  }

  async destroy({ params, response }) {
    try {
      const patient = await Patient.find(params.id);

      if (!patient) {
        return response
          .status(404)
          .send({ message: "Paciente não encontrado" });
      }

      await patient.delete();

      return response
        .status(200)
        .send({ message: "Paciente excluído com sucesso" });
    } catch (error) {
      return response
        .status(500)
        .send({ message: "Erro ao excluir o paciente" });
    }
  }

  async update({ params, request, response }) {
    try {
      const patient = await Patient.find(params.id);

      if (!patient) {
        return response
          .status(404)
          .send({ message: "Paciente não encontrado" });
      }

      const { name, email, cpf } = request.only(["name", "email", "cpf"]);

      patient.name = name;
      patient.email = email;
      patient.cpf = cpf;
      await patient.save();

      return response
        .status(200)
        .send({ message: "Paciente atualizado com sucesso" });
    } catch (error) {
      return response
        .status(500)
        .send({ message: "Erro ao atualizar o paciente" });
    }
  }

  async demands({ params, response }) {
    try {
      const patient = await Patient.find(params.id);

      if (!patient) {
        return response
          .status(404)
          .send({ message: "Paciente não encontrado" });
      }

      const demands = await Demand.query()
        .where("patient_id", patient.patient_id)
        .fetch();

      return response.json({ demands });
    } catch (error) {
      return response
        .status(500)
        .send({ message: "Erro ao buscar as demandas do paciente" });
    }
  }

  async diagnosis({ params, response }) {
    try {
      const patient = await Patient.find(params.id);

      if (!patient) {
        return response
          .status(404)
          .send({ message: "Paciente não encontrado" });
      }

      const diagnosis = await Diagnosis.query()
        .where("patient_id", patient.patient_id)
        .fetch();

      return response.json({ diagnosis });
    } catch (error) {
      return response
        .status(500)
        .send({ message: "Erro ao buscar o diagnóstico do paciente" });
    }
  }
}

module.exports = PatientController;
