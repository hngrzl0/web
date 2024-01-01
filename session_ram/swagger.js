import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
        title: "TEK API",
        version: "1.0.0",
        description:
            "API for TEK community", 
        license: {
            name: "NUM",
            url: "https://num.edu.mn/"
        },
        contact: {
            name: "WebDevAdmin",
            url: "https://www.num.edu.mn/",
            email: "21B1NUM0165@num.edu.mn"
        }
    },
    servers: [
        {
            url: "http://localhost:3000"
        }
    ]
  },
  // Path to the API docs
  apis: ['./app.mjs'],
};

const swaggerSpec = swaggerJSDoc(options);

export function setupSwagger(app) {
  // Serve Swagger UI at /api-docs endpoint
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
    explorer: true
  }));
}
