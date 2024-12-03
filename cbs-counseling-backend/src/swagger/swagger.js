const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const { PORT, API_VERSION } = process.env;

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Counselling API Documentation",
    version: "1.0.0",
    description: "API documentation for Counselling application",
  },
  servers: [
    {
      url: `https://api-counselling.xpensea.com/api/v1`,
    },
    {
      url: `http://localhost:${PORT}/api/${API_VERSION}`,
    },
  ],
  components: {
    securitySchemes: {
      BearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  security: [
    {
      BearerAuth: [],
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ["./src/swagger/paths/*.js"],
};

const swaggerOptions = {
  swaggerOptions: {
    docExpansion: "none",
    filter: true,
    tagsSorter: "alpha",
    operationsSorter: "alpha",
  },
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = { swaggerUi, swaggerSpec, swaggerOptions };
