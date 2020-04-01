'use strict';
const DataTypes = require('sequelize');
const sequelize = require('../../config/sequelize').db;
const Contact = require('../contact/contact.model').contact;

const PhoneNumber = sequelize.define('phone_number', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    number: DataTypes.STRING,
    contact_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Contact,
            key: 'id'
        }
    }
}, {
    freezeTableName: true,
    tableName: 'phone_number',
    instanceMethods: {
        retrieveAll: (onSuccess, onError) => {
            PhoneNumber.findAll({raw: false})
                .then(onSuccess).catch(onError);
        },
        retrieveById: (phone_number_id, onSuccess, onError) => {
            PhoneNumber.find({where: {id: phone_number_id}}, {raw: true})
                .then(onSuccess).catch(onError);
        },
        retrieveByContactId: (contact_id, onSuccess, onError) => {
            PhoneNumber.findAll({where: {contact_id: contact_id},raw:true})
                .then(onSuccess).catch(onError);
        },
        add: function (onSuccess, onError) {
            PhoneNumber.build(buildPhoneNumber(this))
                .save().then(onSuccess).catch(onError);
        },
        addMultiple: (phone_numbers, onSuccess, onError) => {
            PhoneNumber.bulkCreate(phone_numbers).then(onSuccess).catch(onError);
        },
        updateMultiple: (phone_numbers, onSuccess, onError) => {
            PhoneNumber.bulkCreate(phone_numbers,{ updateOnDuplicate: ["number"] }).then(onSuccess).catch(onError);
        },
        updateById: function (phone_number_id, onSuccess, onError) {
            PhoneNumber.update(buildPhoneNumber(this), {where: {id: phone_number_id}})
                .then(onSuccess).catch(onError);
        }
        // retrieveRoutineByUserId: function (onSuccess, onError) {
        //     var query = "SELECT b.*,c.active FROM user a, routine b, user_has_routine c\n" +
        //         "WHERE a.id = c.user_id\n" +
        //         "AND b.id = c.routine_id\n" +
        //         "AND a.id = :id";
        //     sequelize.query(query, {
        //         replacements: {id: '1'},
        //         type: sequelize.QueryTypes.SELECT
        //     })
        //         .then(function (users) {
        //             onSuccess(users)
        //         })
        //         .catch(function (reason) {
        //             onError(reason);
        //         })
        // }
    }
});

/**
 * Builds a phone number
 * @param self
 * @returns {{name, lastName: *|{type: string, xml: {name: string}}|spec.definitions.User.properties.lastName|{type, xml}, birthDate: *, token: *|null|token, username: *|string|{type: string, xml: {name: string}}|spec.definitions.User.properties.username|{type, xml}|string, password, email: *|email|{type, required, index}|string|{type: string, xml: {name: string}}|spec.definitions.User.properties.email, gender, firstTime: *, role_id: User.role_id|{type, references}|*}}
 */
const buildPhoneNumber = (self) => {
    return {
        number: self.number,
        contact_id: self.contact_id
    }
};

module.exports.phoneNumber = PhoneNumber;
