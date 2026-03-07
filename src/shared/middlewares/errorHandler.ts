import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/ApiError";

export function errorHandler(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) {

    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            status: "error",
            error: {
                message: err.message,
                field: err.field
            }
        });
    }

    console.error(err);

    return res.status(500).json({
        status: "error",
        message: "Internal server error",
        detail: err.message
    });

}