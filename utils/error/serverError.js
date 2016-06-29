function ServerError(message, code) {
    this.message = message;
    this.code = code;
    this.stack = Error().stack;
}
ServerError.prototype = Object.create(Error.prototype);
ServerError.prototype.name = "ServerError";
ServerError.prototype.constructor = ServerError;

module.exports = ServerError