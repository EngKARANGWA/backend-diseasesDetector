const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Disease Detection API',
      version: '1.0.0',
      description: 'API documentation for Disease Detection backend',
      servers: [
        {
          url: 'https://backend-diseasesdetector.onrender.com',
          description: 'Render Production Server',
        },
      ],
    },
    components: {
      schemas: {
        Agronomist: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '60c72b2f9b1e8e001c8e4b8a' },
            name: { type: 'string', example: 'John Doe' },
            // Add other fields from your Agronomist model here
          },
        },
      },
    },
  },
  apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};