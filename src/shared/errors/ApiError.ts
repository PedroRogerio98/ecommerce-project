export class AppError extends Error {

    public readonly statusCode: number;
    public readonly field?: string;

    constructor(message: string, statusCode: number, field?: string) {
        super(message);
        this.statusCode = statusCode;
        this.field = field;
    }

    static notFound(message: string) {
        return new AppError(message, 404);
    }

    static badRequest(message: string, field?: string) {
        return new AppError(message, 400, field);
    }

    static unauthorized(message: string) {
        return new AppError(message, 401);
    }

    static forbidden(message: string) {
        return new AppError(message, 403);
    }

    static internalError(message: string) {
        return new AppError(message, 500);
    }

}