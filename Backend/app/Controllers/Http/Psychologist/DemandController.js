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
      const { title, patient_id, appointment_id, relevance } =
        request.only([
          "title",
          "patient_id",
          "appointment_id",
          "relevance",
        ]);

      const demand = new Demand();
      demand.title = title;
      demand.patient_id = patient_id;
      demand.appointment_id = appointment_id;
      demand.relevance = relevance;
      await demand.save();

      return response
        .status(201)
        .send({ message: "Demanda criada com sucesso" });
    } catch (error) {
      return response.status(500).send({ message: "Erro ao criar a demanda" });
    }
  }

  async destroy({ params, response }) {
    try {
      const demand = await Demand.find(params.id);

      if (!demand) {
        return response.status(404).send({ message: "Demanda não encontrada" });
      }

      await demand.delete();

      return response
        .status(200)
        .send({ message: "Demanda excluída com sucesso" });
    } catch (error) {
      return response
        .status(500)
        .send({ message: "Erro ao excluir a demanda" });
    }
  }
}

module.exports = DemandController;
