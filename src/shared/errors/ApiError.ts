export class AppError extends Error {

    public readonly statusCode: number;
    public readonly error?: unknown;
    public readonly field?: string;


    constructor(
        message: unknown,
        statusCode: number,
        error?: unknown,
        field?: string
    ) {
        super(String(message));
        this.statusCode = statusCode;
        this.error = error;
        this.field = field;

        Object.setPrototypeOf(this, AppError.prototype);
    }

}