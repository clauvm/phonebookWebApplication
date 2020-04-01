'use strict';
const DataTypes = require('sequelize');
const sequelize = require('../../config/sequelize').db;

const Contact = sequelize.define('contact', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: DataTypes.STRING,
    last_name: DataTypes.STRING,
}, {
    freezeTableName: true,
    tableName: 'contact',
    instanceMethods: {
        retrieveAll: (onSuccess, onError) => {
            Contact.findAll({raw: false})
                .then(onSuccess).catch(onError);
        },
        retrieveById: (contact_id, onSuccess, onError) => {
            Contact.find({where: {id: contact_id}}, {raw: true})
                .then(onSuccess).catch(onError);
        },
        add: function (onSuccess, onError) {
            Contact.build(buildContact(this))
                .save().then(onSuccess).catch(onError);
        },
        updateById: function (contact_id, onSuccess, onError) {
            Contact.update(buildContact(this), {where: {id: contact_id}})
                .then(onSuccess).catch(onError);
        },
        retrieveByKeyWord: function (key_word, onSuccess, onError) {
            const query = `SELECT DISTINCT a.*
                           FROM contact a,
                                phone_number b
                           WHERE a.id = b.contact_id
                             AND (a.name LIKE :key_word OR a.last_name LIKE :key_word OR b.number LIKE :key_word)`;
            sequelize.query(query, {
                replacements: {key_word: `%${key_word}%`},
                type: sequelize.QueryTypes.SELECT
            })
                .then(function (users) {
                    onSuccess(users)
                })
                .catch(function (reason) {
                    onError(reason);
                })
        },
    }
});

/**
 * Builds a contact
 * @param self
 * @returns {{name, lastName: *|{type: string, xml: {name: string}}|spec.definitions.User.properties.lastName|{type, xml}, birthDate: *, token: *|null|token, username: *|string|{type: string, xml: {name: string}}|spec.definitions.User.properties.username|{type, xml}|string, password, email: *|email|{type, required, index}|string|{type: string, xml: {name: string}}|spec.definitions.User.properties.email, gender, firstTime: *, role_id: User.role_id|{type, references}|*}}
 */
const buildContact = (self) => {
    return {
        name: self.name,
        last_name: self.last_name
    }
};

module.exports.contact = Contact;
