'use strict';
const PhoneNumber = require('./phone_number.model').phoneNumber;

/**
 * Creates a new phoneNumber
 * @param req
 * @param res
 */
module.exports.create = function (req, res) {
    const phoneNumber = PhoneNumber.build(initPhoneNumber(req.body));
    phoneNumber.add(function (success) {
            const phoneNumber = success.dataValues;
            res.json({
                message: 'PhoneNumber created!',
                data: phoneNumber
            });
        },
        function (error) {
            console.log("error");
            console.log(error);
            res.status(404).send("Error creating phoneNumber");
        })
};

/**
 * Creates a phone number in bulk
 * @param req
 * @param res
 */
module.exports.createBulk = function (req, res) {
    const phoneNumber = PhoneNumber.build();
    const mappedPhoneNumbers = req.body.phones.map(val => ({number: val.number, contact_id: req.body.contact_id}));
    phoneNumber.addMultiple(mappedPhoneNumbers, function (success) {
            const phoneNumbers = success.dataValues;
            res.json({
                message: 'PhoneNumbers created!',
                data: phoneNumbers
            });
        },
        function (error) {
            console.log("error");
            console.log(error);
            res.status(404).send("Error creating phoneNumber");
        })
};

/**
 * Updates phone numbers in bulk
 * @param req
 * @param res
 */
module.exports.updateBulk = function (req, res) {
    const phoneNumber = PhoneNumber.build();
    const mappedPhoneNumbers = req.body.phones.map(val => ({...val, contact_id: req.body.contact_id}));
    phoneNumber.updateMultiple(mappedPhoneNumbers, function (success) {
            const phoneNumbers = success.dataValues;
            res.json({
                message: 'PhoneNumbers updated successfully!',
                data: phoneNumbers
            });
        },
        function (error) {
            console.log("error");
            console.log(error);
            res.status(404).send("Error updating phone numbers");
        })
};

/**
 * Gets all phoneNumbers
 * @param req
 * @param res
 */
module.exports.getAll = function (req, res) {
    const phoneNumber = PhoneNumber.build();
    phoneNumber.retrieveAll(function (phoneNumbers) {
        if (phoneNumbers) {
            res.json({
                message: "success",
                data: phoneNumbers
            });
        } else {
            res.status(404).send("No phoneNumbers were found");
        }
    }, function (error) {
        res.status(404).send("Error getting phoneNumbers");
    });
};

/**
 * Gets all phoneNumbers
 * @param req
 * @param res
 */
module.exports.getAllById = function (req, res) {
    const phoneNumber = PhoneNumber.build();
    const {contact_id} = req.params;
    phoneNumber.retrieveByContactId(contact_id, function (phoneNumbers) {
        if (phoneNumbers) {
            res.json({
                message: "success",
                data: phoneNumbers
            });
        } else {
            res.status(404).send("No phoneNumbers were found");
        }
    }, function (error) {
        res.status(404).send("Error getting phoneNumbers");
    });
};

/**
 * Updates a phoneNumber based on an ID
 * @param req
 * @param res
 */
module.exports.update = function (req, res) {
    const phoneNumber = PhoneNumber.build();
    updatePhoneNumber(phoneNumber, req.body);
    phoneNumber.updateById(req.params.phone_number_id, (success) => {
        const phoneNumber = success.dataValues;
        if (success) {
            res.json({
                message: 'phoneNumber updated!',
                data: phoneNumber
            });
        } else {
            res.status(404).send("phoneNumber not found");
        }
    }, (error) => {
        console.log("error updating phoneNumber");
        console.log(error);
        res.status(404).send("Error updating phoneNumber");
    });
};

/**
 * Gets a single phoneNumber
 * @param req
 * @param res
 */
module.exports.getById = function (req, res) {
    const phoneNumber = PhoneNumber.build();
    phoneNumber.retrieveById(req.params.phone_number_id, (phoneNumber) => {
        if (phoneNumber) {
            res.json({
                message: "success",
                data: phoneNumber
            });
        } else {
            res.status(404).send("phoneNumber not found");
        }
    }, (error) => {
        res.status(404).send("Error getting phoneNumber");
    });
};

/**
 * Delete a phoneNumber by id
 * @param req
 * @param res
 */
module.exports.delete = function (req, res) {
    const phoneNumber = PhoneNumber.build();
    phoneNumber.removeById(req.params.phoneNumber_id, (phoneNumber) => {
        if (phoneNumber) {
            res.json({
                message: 'phoneNumber removed!'
            });
        } else {
            res.status(404).send("phoneNumber not found");
        }
    }, (error) => {
        res.status(404).send("Error removing phoneNumber");
    });
};


/**
 * Init a phoneNumber
 * @param payload
 * @returns {{name: (*|string), lastName: ({type: string, xml: {name: string}}|spec.definitions.phoneNumber.properties.lastName|{type, xml}|*|string), birthDate: (*|string), token: (*|token|number|string), phoneNumbername: (*|string), password: (*|string), email: (string|{type: string, xml: {name: string}}|spec.definitions.phoneNumber.properties.email|{type, xml}|*|email), gender: (*|string), firstTime: (*|boolean), role_id: (*|phoneNumber.role_id|{type, references}), image: (*|string), createdAt: number, modifiedAt: number}}
 */
const initPhoneNumber = (payload) => {
    return {
        number: payload.number || '',
        contact_id: payload.contact_id || '',
    }
};

/**
 * Updates properties of current phoneNumber based on payload (not a pure function);
 * @param phoneNumber
 * @param payload
 */
const updatePhoneNumber = (phoneNumber, payload) => {
    phoneNumber.number = payload.number;
};
