import { CustomError, TError } from "./CustomError";

class BadRequestError extends CustomError {
	public name = "BadRequestError";
	public statusCode = 400;
	private errors : Array<TError>;
	constructor(message: string, errors: Array<TError>) {
		super(message ?? "Not Found.");
		this.errors = errors;
		Object.setPrototypeOf(this, BadRequestError.prototype);
	}
	serializeErrors(): TError[] {
		return this.errors;
	}
}


export {BadRequestError}; 