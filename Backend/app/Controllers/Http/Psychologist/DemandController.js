"use strict";

const Demand = use("App/Models/Demand");

class DemandController {
  async index({ response }) {
    try {
      const demands = await Demand.query().fetch();
      return response.send(demands);
    } catch (error) {
      return response
        .status(500)
        .send({ message: "Erro ao buscar as demandas" });
    }
  }

  async store({ request, response }) {
    try {
      const { title, description, patient_id, appointment_id } = request.only([
        "title",
        "description",
        "patient_id",
        "appointment_id",
      ]);

      const demand = new Demand();
      demand.title = title;
      demand.description = description;
      demand.patient_id = patient_id;
      demand.appointment_id = appointment_id;
      await demand.save();

      return response
        .status(201)
        .send({ message: "Demanda criada com sucesso" });
    } catch (error) {
      return response.status(500).send({ message: "Erro ao criar a demanda" });
    }
  }
}

module.exports = DemandController;
