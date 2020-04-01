'use strict';
const Contact = require('./contact.model').contact;
const PhoneNumber = require('../phone_number/phone_number.model').phoneNumber;

/**
 * Creates a new contact
 * @param req
 * @param res
 */
module.exports.create = function (req, res) {

    const contact = Contact.build(initContact(req.body));
    contact.add(function (success) {
            const contact = success.dataValues;
            res.json({
                message: 'Contact created!',
                data: contact
            });
        },
        function (error) {
            res.status(404).send("Error creating contact");
        })
};

/**
 * Creates a new contact with phone numbers
 * @param req
 * @param res
 */
module.exports.createWithPhones = function (req, res) {
    const contact = Contact.build(initContact(req.body));
    const phones = req.body.phoneNumbers;
    contact.add(function (successContact) {
            const contact_id = successContact.dataValues.id;
            const phoneNumber = PhoneNumber.build();
            const mappedPhoneNumbers = phones.map(val => ({number: val.number, contact_id}));
            phoneNumber.addMultiple(mappedPhoneNumbers, (success) => {
                res.json({
                    message: 'Contact and phones created!',
                    data: {
                        contact: successContact.dataValues,
                        phoneNumbers: success.dataValues
                    }
                });

            }, (error) => {
                res.status(404).send("Error creating phones");
            });

        },
        function (error) {
            res.status(404).send("Error creating contact");
        })
};

/**
 * Updates a new contact with phone numbers
 * @param req
 * @param res
 */
module.exports.updateWithPhones = function (req, res) {
    const contact = Contact.build();
    updateContact(contact, req.body);
    const phones = req.body.phoneNumbers;
    const {contact_id} = req.params;
    contact.updateById(contact_id, function (success) {
            const phoneNumber = PhoneNumber.build();
            const mappedPhoneNumbers = phones.map(val => ({...val, contact_id}));
            phoneNumber.updateMultiple(mappedPhoneNumbers, (success) => {
                res.json({
                    message: 'Contact and phones updated!'
                });

            }, (error) => {
                console.log("error");
                console.log(error);
                res.status(404).send("Error creating phones");
            });

        },
        function (error) {
            console.log("error");
            console.log(error);
            res.status(404).send("Error creating contact");
        })
};

/**
 * Gets all contacts
 * @param req
 * @param res
 */
module.exports.getAll = function (req, res) {
    const contact = Contact.build();
    contact.retrieveAll(function (contacts) {
        if (contacts) {
            res.json({
                message: "success",
                data: contacts
            });
        } else {
            res.status(404).send("No contacts were found");
        }
    }, function (error) {
        console.log("Mistake here");
        console.log(error);
        res.status(404).send("Error getting contacts");
    });
};


/**
 * Updates a contact based on an ID
 * @param req
 * @param res
 */
module.exports.update = function (req, res) {
    const contact = Contact.build();
    updateContact(contact, req.body);
    contact.updateById(req.params.contact_id, (success) => {
        const contact = success.dataValues;
        if (success) {
            res.json({
                message: 'contact updated!',
                data: contact
            });
        } else {
            res.status(404).send("contact not found");
        }
    }, (error) => {
        res.status(404).send("Error updating contact");
    });
};

/**
 * Gets a single contact
 * @param req
 * @param res
 */
module.exports.getById = function (req, res) {
    const contact = Contact.build();
    const phoneNumber = PhoneNumber.build();
    const {contact_id} = req.params;
    contact.retrieveById(contact_id, (contact) => {
        if (contact.dataValues) {
            phoneNumber.retrieveByContactId(contact.dataValues.id, (phones) => {
                if (phones) {
                    res.json({
                        message: 'success',
                        data: {contact: contact.dataValues, phoneNumbers: phones}
                    })
                } else {
                    console.log("no phones")
                }
            });
        } else {
            res.status(404).send("contact not found");
        }
    }, (error) => {
        console.log(error);
        res.status(404).send("Error getting contact");
    });
};

/**
 * Gets a contact based on a key word
 * @param req
 * @param res
 */
module.exports.getByKeyWord = function (req, res) {
    const contact = Contact.build();
    const keyWord = req.params.key_word;
    contact.retrieveByKeyWord(keyWord, (contacts) => {
        if (contacts) {
            res.json({
                message: "success",
                data: contacts
            });
        } else {
            res.status(404).send("contact not found");
        }
    }, (error) => {
        res.status(404).send("Error getting contact");
    });
};

/**
 * Delete a contact by id
 * @param req
 * @param res
 */
module.exports.delete = function (req, res) {
    const contact = Contact.build();
    contact.removeById(req.params.contact_id, (contact) => {
        if (contact) {
            res.json({
                message: 'contact removed!'
            });
        } else {
            res.status(404).send("contact not found");
        }
    }, (error) => {
        res.status(404).send("Error removing contact");
    });
};


/**
 * Init a contact
 * @param payload
 * @returns {{name: (*|string), lastName: ({type: string, xml: {name: string}}|spec.definitions.contact.properties.lastName|{type, xml}|*|string), birthDate: (*|string), token: (*|token|number|string), contactname: (*|string), password: (*|string), email: (string|{type: string, xml: {name: string}}|spec.definitions.contact.properties.email|{type, xml}|*|email), gender: (*|string), firstTime: (*|boolean), role_id: (*|contact.role_id|{type, references}), image: (*|string), createdAt: number, modifiedAt: number}}
 */
const initContact = (payload) => {
    return {
        name: payload.name || '',
        last_name: payload.last_name || '',
    }
};

/**
 * Updates properties of current contact based on payload (not a pure function);
 * @param contact
 * @param payload
 */
const updateContact = (contact, payload) => {
    contact.name = payload.name;
    contact.last_name = payload.last_name;
};
