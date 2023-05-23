"use strict";

const Pathology = use("App/Models/Pathology");

class PathologyController {
  async index({ response }) {
    try {
      const pathologies = await Pathology.query().fetch();
      return response.send(pathologies);
    } catch (error) {
      return response
        .status(500)
        .send({ message: "Erro ao buscar as patologias" });
    }
  }

  async store({ request, response }) {
    try {
      const { name, description } = request.only(["name", "description"]);

      const pathology = new Pathology();
      pathology.name = name;
      pathology.description = description;
      await pathology.save();

      return response
        .status(201)
        .send({ message: "Patologia criada com sucesso" });
    } catch (error) {
      return response
        .status(500)
        .send({ message: "Erro ao criar a patologia" });
    }
  }
}

module.exports = PathologyController;
