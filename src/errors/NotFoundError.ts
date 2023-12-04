import { CustomError, TError } from "./CustomError";

class NotFoundError extends CustomError {
	public name = "NotFoundError";
	public statusCode = 404;
	constructor(message: string) {
		super(message ?? "Not Found.");
		Object.setPrototypeOf(this, NotFoundError.prototype);
	}
	serializeErrors(): TError[] {
		return [{
			message: "Not found"
		}];
	}
}


export {NotFoundError}; 