"use strict";

const Appointment = use("App/Models/Appointment");
const Diagnosis = use("App/Models/Diagnosis");
const Demand = use("App/Models/Demand");

class AppointmentController {
  async index({ auth, response }) {
    console.log(auth.user);
    try {
      const appointments = await Appointment.query()
        .with("patient")
        .join("patients", "appointments.patient_id", "patients.patient_id")
        .where("patients.psychologist_id", auth.user.id)
        .orderBy("appointments.created_at", "desc") // Especificar 'created_at' como sendo da tabela 'appointments'
        .fetch();

      return response.send(appointments);
    } catch (error) {
      console.log(error);
      return response
        .status(500)
        .send({ message: "Erro ao buscar os agendamentos" });
    }
  }

  async show({ params, response }) {
    try {
      const appointment = await Appointment.query()
        .where("appointment_id", params.id)
        .with("patient")
        .firstOrFail();

      const demands = await Demand.query()
        .where("appointment_id", params.id)
        .fetch();

      const appointmentData = appointment.toJSON();
      appointmentData.demands = demands.toJSON();

      return response.send({ appointment: appointmentData });
    } catch (error) {
      return response
        .status(500)
        .send({ message: "Erro ao buscar o agendamento" });
    }
  }

  async store({ request, response, params: { patient_id } }) {
    try {
      const data = request._body;

      const appointment = new Appointment();
      appointment.duration = data.duration;
      appointment.patient_id = patient_id;
      appointment.general_notes = data.general_notes;
      await appointment.save();

      if (!data.diagnosis_id) {
        const diagnosis = new Diagnosis();
        diagnosis.description = data.diagnosis_description;
        diagnosis.patient_id = patient_id;
        await diagnosis.save();
      } else {
        const diagnosis = await Diagnosis.find(data.diagnosis_id);
        diagnosis.description = data.diagnosis_description;
        await diagnosis.save();
      }

      if (data.demandsToSave.length > 0) {
        data.demandsToSave.forEach(async (demand) => {
          const newDemand = new Demand();
          newDemand.patient_id = patient_id;
          newDemand.appointment_id = appointment.appointment_id;
          newDemand.title = demand.title;
          newDemand.relevance = demand.relevance;
          await newDemand.save();
        });
      }

      if (data.demandsToRemoval.length > 0) {
        data.demandsToRemoval.forEach(async (demand_id) => {
          const demandToRemove = await Demand.find(demand_id);
          await demandToRemove.delete();
        });
      }

      if (data.demandsToUpdate.length > 0) {
        data.demandsToUpdate.forEach(async (demand) => {
          const demandToUpdate = await Demand.find(demand.demand_id);
          demandToUpdate.addressed = demand.addressed;
          await demandToUpdate.save();
        });
      }

      return response
        .status(201)
        .send({ message: "Agendamento criado com sucesso" });
    } catch (error) {
      return response
        .status(500)
        .send({ message: "Erro ao criar o agendamento" });
    }
  }

  async destroy({ params, response }) {
    try {
      const appointment = await Appointment.find(params.id);

      if (!appointment) {
        return response
          .status(404)
          .send({ message: "Agendamento não encontrado" });
      }

      // Deletar demandas relacionadas
      const demands = await Demand.query()
        .where("appointment_id", appointment.appointment_id)
        .fetch();
      await Promise.all(demands.rows.map((demand) => demand.delete()));

      // Deletar o agendamento
      await appointment.delete();

      return response
        .status(200)
        .send({ message: "Agendamento excluído com sucesso" });
    } catch (error) {
      return response
        .status(500)
        .send({ message: "Erro ao excluir o agendamento" });
    }
  }
}

module.exports = AppointmentController;
