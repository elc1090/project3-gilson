'use strict'

/** @type {import('@adonisjs/framework/src/Env')} */
const Env = use('Env')

/** @type {import('@adonisjs/ignitor/src/Helpers')} */
const Helpers = use('Helpers')

/** @type {import('url-parse')} */
const Url = use('url-parse');

const CLEARDB_DATABASE_URL = new Url(Env.get('CLEARDB_DATABASE_URL'));

module.exports = {
  /*
  |--------------------------------------------------------------------------
  | Default Connection
  |--------------------------------------------------------------------------
  |
  | Connection defines the default connection settings to be used while
  | interacting with SQL databases.
  |
  */
  connection: "mysql",

  /*
  |--------------------------------------------------------------------------
  | Sqlite
  |--------------------------------------------------------------------------
  |
  | Sqlite is a flat file database and can be good choice under development
  | environment.
  |
  | npm i --save sqlite3
  |
  */
  sqlite: {
    client: 'sqlite3',
    connection: {
      filename: Helpers.databasePath(`${Env.get('DB_DATABASE', 'development')}.sqlite`)
    },
    useNullAsDefault: true
  },

  /*
  |--------------------------------------------------------------------------
  | MySQL
  |--------------------------------------------------------------------------
  |
  | Here we define connection settings for MySQL database.
  |
  | npm i --save mysql
  |
  */
 /*
  mysql: {
    client: 'mysql',
    connection: {
      host: CLEARDB_DATABASE_URL.host,
      port: '',
      user: CLEARDB_DATABASE_URL.username,
      password: CLEARDB_DATABASE_URL.password,
      database: CLEARDB_DATABASE_URL.pathname.substr(1)
    },
    healthCheck: false
  },*/
};


// Verifica se está em produção
if (Env.get('NODE_ENV') === 'production') {
  module.exports = {
    connection: 'mysql',
    mysql: {
      client: 'mysql',
      connection: {
        host: CLEARDB_DATABASE_URL.host,
        port: '',
        user: CLEARDB_DATABASE_URL.username,
        password: CLEARDB_DATABASE_URL.password,
        database: CLEARDB_DATABASE_URL.pathname.substr(1)
      },
      healthCheck: false
    }
  };
} else if (Env.get('NODE_ENV') === 'development') {
  // Configuração para desenvolvimento local
  module.exports = {
    connection: 'mysql',
    mysql: {
      client: 'mysql',
      connection: {
        host: Env.get('DB_HOST', 'localhost'),
        port: Env.get('DB_PORT', ''),
        user: Env.get('DB_USER', 'root'),
        password: Env.get('DB_PASSWORD', ''),
        database: Env.get('DB_DATABASE', 'adonis')
      }
    }
  };
}

/*
|--------------------------------------------------------------------------
| PostgreSQL
|--------------------------------------------------------------------------
|
| Here we define connection settings for PostgreSQL database.
|
| npm i --save pg
|
*/
module.exports.pg = {
  client: 'pg',
  connection: {
    host: Env.get('DB_HOST', 'localhost'),
    port: Env.get('DB_PORT', ''),
    user: Env.get('DB_USER', 'root'),
    password: Env.get('DB_PASSWORD', ''),
    database: Env.get('DB_DATABASE', 'adonis')
  }
};
