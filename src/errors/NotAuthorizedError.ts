import { CustomError, TError } from "./CustomError";

class NotAuthorized extends CustomError {
	public name = "NotAuthorized";
	public statusCode = 401;
	private errors : Array<TError> | undefined;

	constructor(message: string, errors?: Array<TError>) {
		super(message ?? "Not Authorized.");
		this.errors = errors;
		Object.setPrototypeOf(this, NotAuthorized.prototype);
	}
	serializeErrors(): TError[] {
		return this.errors ?? [{message: this.message}];
	}
}


export {NotAuthorized}; 