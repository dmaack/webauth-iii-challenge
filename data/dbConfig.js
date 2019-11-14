const knex = require('knex');
const secret = require('../config/secrets');

const environment = secret.environment || 'development'

const knexConfig = require('../knexfile')[environment];

module.exports = knex(knexConfig)