function UnauthorisedError(message) {
    this.message = message;
    this.stack = Error().stack;
}
UnauthorisedError.prototype = Object.create(Error.prototype);
UnauthorisedError.prototype.name = "UnauthorisedError";
UnauthorisedError.prototype.constructor = UnauthorisedError;

module.exports = UnauthorisedError