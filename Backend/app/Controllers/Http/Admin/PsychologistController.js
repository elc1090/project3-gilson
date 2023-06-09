"use strict";

const Psychologist = use("App/Models/Psychologist");
const User = use("App/Models/User");

class PsychologistController {
  async index({ response }) {
    try {
      const psychologists = await Psychologist.query().fetch();

      return response.json({ psychologists });
    } catch (error) {
      return response.status(401).send({ message: "Usuário não autenticado" });
    }
  }

  async show({ params, response }) {
    try {
      const psychologist = await Psychologist.query()
        .with("user")
        .where("psychologist_id", params.id)
        .firstOrFail();

      return response.json({ psychologist });
    } catch (error) {
      console.log(error);
      return response.status(401).send({ message: "Usuário não autenticado" });
    }
  }

  async store({ request, response }) {
    try {
      // Obtém os dados do novo psicólogo a partir do corpo da requisição
      const { cpf, crp, email, password, name } = request.only([
        "cpf",
        "crp",
        "email",
        "password",
        "name",
      ]);

      const newUser = new User();
      newUser.username = cpf; // Defina o nome de usuário conforme necessário
      newUser.email = email; // Defina o e-mail conforme necessário
      newUser.password = password; // Defina a senha conforme necessário
      newUser.username = name;
      newUser.role = "psychologist";
      await newUser.save();

      // Cria um novo psicólogo associado ao usuário
      const psychologist = new Psychologist();
      psychologist.user_id = newUser.id;
      psychologist.cpf = cpf;
      psychologist.crp = crp;
      psychologist.name = name;
      await psychologist.save();

      return response
        .status(201)
        .send({ message: "Psicólogo criado com sucesso" });
    } catch (error) {
      return response.status(401).send({ message: "Usuário não autenticado" });
    }
  }

  async destroy({ params, response }) {
  try {
    const psychologist = await Psychologist.query()
      .where("psychologist_id", params.id)
      .firstOrFail();

    const user = await User.query()
      .where("id", psychologist.user_id)
      .firstOrFail();

    await user.delete();

    return response.status(200).send({ message: "Psicólogo removido com sucesso" });
  } catch (error) {
    console.log(error);
    return response.status(401).send({ message: "Usuário não autenticado" });
  }
}

}

module.exports = PsychologistController;
