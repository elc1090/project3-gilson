"use strict";

const Appointment = use("App/Models/Appointment");

class AppointmentController {
  async index({ response }) {
    try {
      const appointments = await Appointment.query().fetch();
      return response.send(appointments);
    } catch (error) {
      return response
        .status(500)
        .send({ message: "Erro ao buscar os agendamentos" });
    }
  }

  async store({ request, response }) {
    try {
      const { date, time, patient_id } = request.only([
        "date",
        "time",
        "patient_id",
      ]);

      const appointment = new Appointment();
      appointment.date = date;
      appointment.time = time;
      appointment.patient_id = patient_id;
      await appointment.save();

      return response
        .status(201)
        .send({ message: "Agendamento criado com sucesso" });
    } catch (error) {
      return response
        .status(500)
        .send({ message: "Erro ao criar o agendamento" });
    }
  }
}

module.exports = AppointmentController;
