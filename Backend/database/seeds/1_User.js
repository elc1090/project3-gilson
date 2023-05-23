'use strict';

/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const User = use('App/Models/User');

class UserSeeder {
  async run() {
    await User.create({
      username: 'admin',
      email: 'admin@mail.com',
      password: 'admin',
    });
  }
}

module.exports = UserSeeder;
