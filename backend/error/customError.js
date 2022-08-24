class MainError extends Error {
  constructor(errorMessage, errorType = "") {
    super();

    this.name = this.constructor.name;
    this.message = errorMessage;

    switch (this.constructor.name) {
      case "AuthenticationError":
        if (errorType == 0) this.statusCode = 401;
        else {
          this.statusCode = 400;
        }
        break;

      case "UserError":
        console.log("user error");
        if (errorType == 0) {
          this.statusCode = 404;
        } else {
          this.statusCode = 409;
        }
        break;

      case "PostError":
        console.log("post error");
        if (errorType == 0) {
          this.statusCode = 404;
        } else {
          this.statusCode = 400;
        }

        break;

      case "CommentError":
        console.log("comment error");
        if (errorType == 0) {
          this.statusCode = 404;
        } else {
          this.statusCode = 400;
        }

        break;

      case "RequestError":
        console.log("req error");
        if (errorType == 1) {
          this.statusCode = 401;
        } else {
          this.statusCode = 400;
        }
        break;

      default:
        console.log("No handler for that");
    }
  }
}

class AuthenticationError extends MainError {}
class UserError extends MainError {}
class PostError extends MainError {}
class RequestError extends MainError {}

module.exports = {
  MainError,
  AuthenticationError,
  UserError,
  PostError,
  RequestError,
};
