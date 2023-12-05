import { CustomError, TError } from "./CustomError";

class NotFoundError extends CustomError {
	public name = "NotFoundError";
	public statusCode = 404;
	private errors : Array<TError> | undefined;
	constructor(message: string, errors?: Array<TError>) {
		super(message ?? "Not Found.");
		this.errors = errors;
		Object.setPrototypeOf(this, NotFoundError.prototype);
	}
	serializeErrors(): TError[] {
		return this.errors ?? [{message: this.message}];
	}
}


export {NotFoundError}; 