class GeneralError extends Error {
    statusCode: number;
    constructor(code = 500, message = 'Someting Went Wrong') {
        super(message);
        this.statusCode = code;
    }
}

class BadRequest extends GeneralError {
    constructor() {
        super(400, 'Incorrect Data Provided');
    }
}

class NotFound extends GeneralError {
    constructor() {
        super(404, 'Resource Not Found');
    }
}

export { 
    GeneralError,
    BadRequest,
    NotFound,
}