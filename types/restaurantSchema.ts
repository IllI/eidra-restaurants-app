/**
 * OpenAPI Schema Reference
 * This file contains the API schema definition for reference purposes.
 * The actual API endpoints may differ - see types/api.ts for current types.
 */

export const restaurantApiSchema = {
  openapi: "3.0.1",
  info: {
    title: "Next.js Restaurant API",
    version: "1.0.0",
    description: "API definition for a modern restaurant application including Menu, Orders, and Reservations."
  },
  servers: [
    {
      url: "/api",
      description: "Next.js API Routes"
    }
  ],
  paths: {
    "/menu": {
      get: {
        operationId: "getMenu",
        summary: "Retrieve the full menu",
        description: "Returns a list of all available menu items, optionally filtered by category.",
        parameters: [
          {
            name: "category",
            in: "query",
            schema: { "type": "string", "enum": ["starter", "main", "dessert", "drink"] },
            required: false
          }
        ],
        responses: {
          "200": {
            description: "Menu retrieved successfully",
            content: { "application/json": { schema: { type: "array", items: { "$ref": "#/components/schemas/MenuItem" } } } }
          }
        }
      }
    },
    "/orders": {
      post: {
        operationId: "createOrder",
        summary: "Place a new order",
        requestBody: {
          required: true,
          content: { "application/json": { schema: { "$ref": "#/components/schemas/CreateOrderRequest" } } }
        },
        responses: {
          "201": {
            description: "Order confirmed",
            content: { "application/json": { schema: { "$ref": "#/components/schemas/Order" } } }
          }
        }
      },
      get: {
        operationId: "getOrderHistory",
        summary: "Get order history",
        responses: {
          "200": {
            description: "History retrieved",
            content: { "application/json": { schema: { type: "array", items: { "$ref": "#/components/schemas/Order" } } } }
          }
        }
      }
    },
    "/reservations": {
      post: {
        operationId: "createReservation",
        summary: "Book a table",
        requestBody: {
          required: true,
          content: { "application/json": { schema: { "$ref": "#/components/schemas/CreateReservationRequest" } } }
        },
        responses: {
          "201": {
            description: "Reservation confirmed",
            content: { "application/json": { schema: { "$ref": "#/components/schemas/Reservation" } } }
          }
        }
      }
    }
  },
  components: {
    schemas: {
      MenuItem: {
        type: "object",
        required: ["id", "name", "price", "category"],
        properties: {
          id: { type: "string", format: "uuid" },
          name: { type: "string" },
          description: { type: "string" },
          price: { type: "number", format: "float" },
          category: { type: "string", enum: ["starter", "main", "dessert", "drink"] },
          imageUrl: { type: "string", format: "uri" },
          isVegetarian: { type: "boolean" },
          isGlutenFree: { type: "boolean" },
          available: { type: "boolean", default: true }
        }
      },
      OrderItem: {
        type: "object",
        required: ["menuItemId", "quantity"],
        properties: {
          menuItemId: { type: "string", format: "uuid" },
          quantity: { type: "integer", minimum: 1 },
          specialRequests: { type: "string" }
        }
      },
      CreateOrderRequest: {
        type: "object",
        required: ["items", "customerName"],
        properties: {
          items: { type: "array", items: { "$ref": "#/components/schemas/OrderItem" } },
          customerName: { type: "string" },
          customerPhone: { type: "string" },
          tableNumber: { type: "integer" },
          orderType: { type: "string", enum: ["dine-in", "takeout", "delivery"] }
        }
      },
      Order: {
        type: "object",
        properties: {
          id: { type: "string", format: "uuid" },
          status: { type: "string", enum: ["pending", "confirmed", "preparing", "ready", "completed", "cancelled"] },
          totalAmount: { type: "number" },
          createdAt: { type: "string", format: "date-time" },
          items: { type: "array", items: { "$ref": "#/components/schemas/OrderItem" } }
        }
      },
      CreateReservationRequest: {
        type: "object",
        required: ["name", "date", "partySize", "phone"],
        properties: {
          name: { type: "string" },
          date: { type: "string", format: "date-time" },
          partySize: { type: "integer", minimum: 1, maximum: 20 },
          phone: { type: "string" },
          email: { type: "string", format: "email" },
          notes: { type: "string" }
        }
      },
      Reservation: {
        type: "object",
        allOf: [
          { "$ref": "#/components/schemas/CreateReservationRequest" },
          {
            type: "object",
            properties: {
              id: { type: "string", format: "uuid" },
              status: { type: "string", enum: ["confirmed", "cancelled", "completed", "no-show"] }
            }
          }
        ]
      }
    }
  }
};

