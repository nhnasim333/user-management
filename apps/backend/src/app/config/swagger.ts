import swaggerJsdoc from "swagger-jsdoc";
import { Options } from "swagger-jsdoc";

const options: Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "User Management API",
      version: "1.0.0",
      description: "A RESTful API for managing users with search, filtering, and status toggling capabilities",
      contact: {
        name: "API Support",
        email: "support@example.com",
      },
    },
    servers: [
      {
        url: "http://localhost:5000",
        description: "Development server",
      },
    ],
    tags: [
      {
        name: "Users",
        description: "User management endpoints",
      },
    ],
    components: {
      schemas: {
        User: {
          type: "object",
          required: ["name", "email"],
          properties: {
            id: {
              type: "string",
              description: "The auto-generated id of the user",
              example: "65f1b2c3d4e5f6a7b8c9d0e1",
            },
            name: {
              type: "string",
              description: "The name of the user",
              example: "John Doe",
            },
            email: {
              type: "string",
              format: "email",
              description: "The email of the user",
              example: "john@example.com",
            },
            role: {
              type: "string",
              enum: ["admin", "editor", "viewer"],
              description: "The role of the user",
              example: "admin",
              default: "viewer",
            },
            active: {
              type: "boolean",
              description: "Whether the user is active",
              example: true,
              default: true,
            },
            createdAt: {
              type: "string",
              format: "date-time",
              description: "The date the user was created",
              example: "2024-01-22T10:30:00.000Z",
            },
          },
        },
        CreateUserInput: {
          type: "object",
          required: ["name", "email"],
          properties: {
            name: {
              type: "string",
              description: "The name of the user",
              example: "John Doe",
            },
            email: {
              type: "string",
              format: "email",
              description: "The email of the user",
              example: "john@example.com",
            },
            role: {
              type: "string",
              enum: ["admin", "editor", "viewer"],
              description: "The role of the user",
              example: "viewer",
              default: "viewer",
            },
            active: {
              type: "boolean",
              description: "Whether the user is active",
              example: true,
              default: true,
            },
          },
        },
        SuccessResponse: {
          type: "object",
          properties: {
            success: {
              type: "boolean",
              example: true,
            },
            message: {
              type: "string",
              example: "Operation successful",
            },
            data: {
              type: "object",
            },
          },
        },
        ErrorResponse: {
          type: "object",
          properties: {
            success: {
              type: "boolean",
              example: false,
            },
            message: {
              type: "string",
              example: "Error message",
            },
            errorSources: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  path: {
                    type: "string",
                  },
                  message: {
                    type: "string",
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  apis: ["./src/app/modules/**/*.route.ts", "./src/app/routes/*.ts"],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
