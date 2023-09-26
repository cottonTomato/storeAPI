import { ErrorRequestHandler } from "express";

const errorHandler: ErrorRequestHandler = function (err, req, res, next) {
    console.log(err.stack)
    res
        .status(err.statusCode ?? 500)
        .json({
            sucess: false,
            message: err.message ?? 'Someting went wrong',
    });
}

export default errorHandler;