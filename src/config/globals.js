require('dotenv').config()

module.exports = {
    PORT: process.env.PORT || 8080,
    NODE_ENV: process.env.NODE_ENV,
}

//npm i knex mysql --save
//npx knex init   (para crear el archivo de config)
//npx knex migrate:make init --migrations-directory src/models/db/migrations
//npx knex migrate:latest --knexfile src/models/db/knexfile.js
//npx knex migrate:down --knexfile src/models/db/knexfile.js