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

      console.log("aquii")

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
}

module.exports = PsychologistController;
