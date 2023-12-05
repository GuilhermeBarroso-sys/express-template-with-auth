import { CustomError, TError } from "./CustomError";

class ConflictError extends CustomError {
	public name = "ConflictError";
	public statusCode = 409;
	private errors : Array<TError> | undefined;
	constructor(message: string, errors?: Array<TError>) {
		super(message ?? "Conflict.");
		this.errors = errors;
		Object.setPrototypeOf(this, ConflictError.prototype);
	}
	serializeErrors(): TError[] {
		return this.errors ?? [{message: this.message}];
	}
}


export {ConflictError}; 