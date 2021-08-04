class ClientError extends Error {
    constructor(message) {
        super(message);
        this.statusCode = 400;
        this.name - "ClientError";
    }
}

class NotFoundError extends Error {
    constructor(message) {
        super(message);
        this.statusCode = 404;
        this.name - "NotFoundError";
    }
}

class InternalServerError extends Error {
    constructor(message) {
        super(message);
        this.statusCode = 500;
        this.name - "InternalServerError";
    }
}

class DatabaseError extends Error{
    constructor(message){
        super(message);
        this.statusCode = 503;
        this.name = "DatabaseError";
    }
}

module.exports = {
    ClientError,
    InternalServerError,
    NotFoundError,
    DatabaseError,
};
