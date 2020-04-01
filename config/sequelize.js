'use strict';
const Sequelize = require('sequelize');
const config = require('./../config');

/**
 * Connection for the database, we are using an ORM called Sequelize.
 * @type {Sequelize}
 */
const db = new Sequelize(config.database, config.user, config.password,{
    host : config.host,
    port : config.mysqlPort,
    logging: console.log,
    define: {
        logging: console.log,
        timestamps: false
    }
});

module.exports.db=db;
