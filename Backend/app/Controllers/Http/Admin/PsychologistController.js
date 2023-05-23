"use strict";

const Psychologist = use("App/Models/Psychologist");
const User = use("App/Models/User");
const { auth } = require("@adonisjs/auth");

class PsychologistController {
  async index({ response }) {
    try {
      // Verifica se o usuário está autenticado
      await auth.check();

      // Obtém o usuário autenticado
      const user = await auth.authenticate();

      // Verifica se o usuário é um psicólogo
      if (user.role !== "psychologist") {
        return response.status(403).send({ message: "Acesso negado" });
      }

      // Obtém todos os psicólogos
      const psychologists = await Psychologist.query().fetch();

      return response.send(psychologists);
    } catch (error) {
      return response.status(401).send({ message: "Usuário não autenticado" });
    }
  }

  async store({ request, response }) {
    try {
      // Verifica se o usuário está autenticado
      await auth.check();

      // Obtém o usuário autenticado
      const user = await auth.authenticate();

      // Verifica se o usuário é um admin
      if (user.role !== "user") {
        return response.status(403).send({ message: "Acesso negado" });
      }

      // Obtém os dados do novo psicólogo a partir do corpo da requisição
      const { cpf, crp, email, password, username } = request.only([
        "cpf",
        "crp",
        "email",
        "password",
        "username",
      ]);

      // Cria um novo usuário associado ao psicólogo
      const newUser = new User();
      newUser.username = cpf; // Defina o nome de usuário conforme necessário
      newUser.email = email; // Defina o e-mail conforme necessário
      newUser.password = password; // Defina a senha conforme necessário
      newUser.username = username;
      newUser.role = "psychologist";
      await newUser.save();

      // Cria um novo psicólogo associado ao usuário
      const psychologist = new Psychologist();
      psychologist.user_id = newUser.id;
      psychologist.cpf = cpf;
      psychologist.crp = crp;
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
