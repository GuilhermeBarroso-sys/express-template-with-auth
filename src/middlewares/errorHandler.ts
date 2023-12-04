import { NextFunction, Request, Response } from "express";
import { CustomError } from "../errors/CustomError";

export function errorHandler(err : Error, request : Request, response : Response, next : NextFunction) {
	if(err instanceof CustomError) {
		console.log("----------* Error Log *----------");

		console.log({
			errorName: err.name,
			customError: true,
			message: err.message,
			statusCode: err.statusCode,
			serialize: err.serializeErrors()
		});
		console.log("----------* Error Log *----------");
		return response.status(err.statusCode).json(err.serializeErrors());
	}
	else {
		console.log("----------* Error Log *----------");
		console.log({
			errorName: err.name,
			customError: false,
			message: err.message,
			stack: err.stack
		});
		console.log("----------* Error Log *----------");
		return response.status(500).json([{message: "Server Error"}]);
	}
}