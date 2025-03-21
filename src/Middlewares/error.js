class Errorhandler extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

const Errormiddle = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

    if (err.name === "CastError") {
        err.message = `Invalid${err.path}`;
        err = new Errorhandler(message, 400)
    }
    if (err.name === "JsonWebTokenError") {
        err.message = `Json Web Token is invalid `;
        err = new Errorhandler(message, 400)
    }
    if (err.name === "TokenExpiredError") {
        err.message = `Json Web Token is Expired `;
        err = new Errorhandler(message, 400)
    }
    if (err.code === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)}  Entered`
        const err = new Errorhandler(message, 400)
    }
    res.status(err.statusCode).json({ message: err.message });
}

module.exports = { Errormiddle, Errorhandler };