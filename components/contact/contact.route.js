const contact = require('./contact.controller');
const express = require('express');
const router = express.Router();

/**
 * @swagger
 * definitions:
 *   Contact:
 *     properties:
 *       name:
 *         type: string
 *         example: "Claudia"
 *       lastName:
 *         type: string
 *         example: "Vaquera"
 */

/**
 * @swagger
 * /contact:
 *   get:
 *     tags:
 *       - Contact
 *     description: Returns all contacts
 *     produces:
 *       - application/json
 *     security:
 *       - api_key: []
 *     responses:
 *       200:
 *         description: An array of users
 *         schema:
 *           $ref: '#/definitions/Contact'
 */
router.get('/', contact.getAll);

/**
 * @swagger
 * /contact/:contact_id:
 *   get:
 *     tags:
 *       - Contact
 *     description: Returns a contact
 *     produces:
 *       - application/json
 *     security:
 *       - api_key: []
 *     responses:
 *       200:
 *         description: An array of users
 *         schema:
 *           $ref: '#/definitions/Contact'
 */
router.get('/:contact_id', contact.getById);

router.get('/key/:key_word', contact.getByKeyWord);

/**
 * @swagger
 * /contact:
 *   post:
 *     tags:
 *       - Contact
 *     description: Creates a new contact
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: string
 *         lastName: string
 *         description: Contact object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Contact'
 *     security:
 *        - api_key: []
 *     responses:
 *       200:
 *         description: Successfully created
 */
router.post('/', contact.create);

/**
 * @swagger
 * /contact/phoneNumbers:
 *   post:
 *     tags:
 *       - Contact
 *     description: Creates a new contact with phone numbers
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: string
 *         description: Contact's name
 *         in: body
 *         required: true
 *       - lastName: string
 *         description: Contact's lastName
 *         in: body
 *       - phoneNumbers : array
 *         description: Contact's phoneNumbers
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Contact'
 *     security:
 *        - api_key: []
 *     responses:
 *       200:
 *         description: Successfully created
 */
router.post('/phoneNumbers', contact.createWithPhones);


/**
 * @swagger
 * /contact/{contact_id}:
 *   put:
 *     tags:
 *       - Contact
 *     description: Updates a single contact
 *     produces: application/json
 *     parameters:
 *       - name: contact_id
 *         description: Contact's id
 *         in: path
 *         required: true
 *         schema:
 *           type: 'string'
 *       - name: contact
 *         in: body
 *         required: true
 *         description: Fields for the Contact resource
 *         schema:
 *           $ref: '#/definitions/Contact'
 *     security:
 *       - api_key: []
 *     responses:
 *       200:
 *         description: Successfully updated
 */
router.put('/:contact_id', contact.updateWithPhones);

// router.put('/:contact_id/phoneNumbers', contact.updateWithPhones);

module.exports = router;
