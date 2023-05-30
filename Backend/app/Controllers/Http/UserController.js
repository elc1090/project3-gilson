'use strict'

const User = use('App/Models/User')

class UserController {
  async login({ request, auth, response }) {
    const { email, password } = request.all();
    try {
      const token = await auth.attempt(email, password);

      const user = await User.findByOrFail('email', email)

      return response.json({ auth: token, roles: user.role, success: true });
    } catch (error) {
      console.log(error)
      return response.status(401).json({ message: 'Usuário ou senha inválidos' });
    }
  }

  show({ auth, params }) {
    if (auth.user.id !== Number(params.id)) {
      return "You cannot see someone else's profile"
    }

    return auth.user
  }
}

module.exports = UserController
