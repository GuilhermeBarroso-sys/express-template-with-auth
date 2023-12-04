import { CustomError, TError } from "./CustomError";

class NotAuthorized extends CustomError {
	public name = "NotAuthorized";
	public statusCode = 401;
	constructor(message: string) {
		super(message ?? "Not Authorized.");
		Object.setPrototypeOf(this, NotAuthorized.prototype);
	}
	serializeErrors(): TError[] {
		return [{
			message: "Not Authorized"
		}];
	}
}


export {NotAuthorized}; 