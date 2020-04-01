const phoneNumber = require('./phone_number.controller');
const express = require('express');
const router = express.Router();

/**
 * @swagger
 * definitions:
 *   PhoneNumber:
 *     properties:
 *       number:
 *         type: int
 *         example: "+39 02 1234567"
 *       contact_id:
 *         type: int
 *         example: "1"
 */

/**
 * @swagger
 * /phoneNumber:
 *   get:
 *     tags:
 *       - PhoneNumber
 *     description: Returns all phoneNumbers
 *     produces:
 *       - application/json
 *     security:
 *       - api_key: []
 *     responses:
 *       200:
 *         description: An array of phone numbers
 *         schema:
 *           $ref: '#/definitions/PhoneNumber'
 */
router.get('/', phoneNumber.getAll);

/**
 * @swagger
 * /phoneNumber:
 *   post:
 *     tags:
 *       - PhoneNumber
 *     description: Creates a new phone number for contact
 *     produces:
 *       - application/json
 *     parameters:
 *       - number: string
 *         contact_id: int
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Contact'
 *     security:
 *        - api_key: []
 *     responses:
 *       200:
 *         description: Successfully created
 */
router.post('/', phoneNumber.create);

router.post('/bulk', phoneNumber.createBulk);

router.put('/bulk', phoneNumber.updateBulk);

module.exports = router;
