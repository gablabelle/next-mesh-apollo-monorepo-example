module.exports = [
  {
    "openapi": "3.0.0",
    "info": {
      "version": "2021.5",
      "title": "SSO Authentication V5",
      "description": ""
    },
    "servers": [
      {
        "url": "https://dev-sso.whatever.com/api/v5",
        "description": "SSO authentication server version 5"
      }
    ],
    "paths": {
      "/auth/sso/integration/azure": {
        "parameters": [
          {
            "$ref": "#/components/parameters/Accept-Language"
          },
          {
            "$ref": "#/components/parameters/X-Correlation-Id"
          }
        ],
        "post": {
          "operationId": "login-v5-sso-azure",
          "summary": "Login SSO Azure",
          "tags": [
            "Authentication"
          ],
          "description": "## Behavior\nTBD",
          "requestBody": {
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "additionalProperties": false,
                  "properties": {
                    "clientSideToken": {
                      "type": "string"
                    }
                  },
                  "required": [
                    "clientSideToken"
                  ]
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "OK",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/v5_auth_sessionGet"
                  }
                }
              }
            }
          }
        },
        "get": {
          "operationId": "authentication-sso-v4",
          "summary": "Authentication SSO",
          "tags": [
            "Authentication"
          ],
          "description": "## Behavior",
          "responses": {
            "200": {
              "description": "OK"
            }
          }
        }
      }
    },
    "components": {
      "schemas": {
        "v5_auth_sessionGet": {
          "title": "Session - Get",
          "properties": {
            "token": {
              "type": "string"
            },
            "userId": {
              "type": "integer",
              "format": "int64"
            },
            "correlationId": {
              "type": "string"
            },
            "firstLogin": {
              "type": "boolean"
            },
            "hasEmployers": {
              "type": "boolean"
            },
            "employers": {
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "userRole": {
              "type": "string",
              "enum": [
                "ROLE_USER",
                "ROLE_ADMIN"
              ]
            }
          }
        }
      },
      "parameters": {
        "Accept-Language": {
          "name": "Accept-Language",
          "in": "header",
          "schema": {
            "type": "string"
          }
        },
        "X-Correlation-Id": {
          "name": "X-Correlation-Id",
          "in": "header",
          "description": "Correlation ID from the auth call.",
          "schema": {
            "type": "string"
          }
        }
      }
    }
  }
]