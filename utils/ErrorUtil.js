module.exports = {
  createError({ details, code, message, type }) {
    const error = {};
    error.details = details;
    error.code = code;
    error.message = message;
    error.type = type;
    throw error;
  },

  createValidationError({ details, message, type }) {
    this.createError({ message: message || "ValidationError", code: 400, details: details, type: type || "ValidationError" });
  },
  createTokenError({ message, details, type }) {
    this.createError({ message: message || "TokenError", code: 401, details: details, type: type || "TokenError" });
  },
  createAuthorizationError({ message, details, type }) {
    this.createError({ message: message || "UnauthorizedAction", code: 403, details: details, type: type || "UnauthorizedAction" });
  },
  createNotFoundError({ message, details, type }) {
    this.createError({ message: message || "NotFoundError", code: 404, details: details, type: type || "NotFoundError" });
  }
};
