const swaggerJSDoc = require('swagger-jsdoc');

module.exports = function () {
    const swaggerDefinition = {
        info: {
            title: 'Phonebook API',
            version: '1.0.0',
            description: 'API for phonebook application'
        },
        host: 'localhost:3000',
        basePath: '/',
        securityDefinitions: {
            api_key: {
                type: 'apiKey',
                name: 'x-api-key',
                in: 'header'
            }
        }
    };

// options for the swagger docs
    const options = {
        // import swaggerDefinitions
        swaggerDefinition: swaggerDefinition,
        // path to the API docs
        apis: [
            './components/contact/contact.route.js',
            './components/phone_number/phone_number.route.js',
        ]
    };

    const docs = swaggerJSDoc(options);
    return docs;
};
