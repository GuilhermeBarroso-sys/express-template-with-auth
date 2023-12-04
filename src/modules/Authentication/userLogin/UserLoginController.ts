import { Request, Response } from "express";
import { UserLoginUseCase } from "./UserLoginUseCase";
import { z } from "zod";
import { BadRequestError } from "../../../errors/BadRequestError";
export class UserLoginController {
	constructor(private userLoginUseCase : UserLoginUseCase) {}
	async handle(request: Request, response: Response) {
		const schema = z.object({
			email: z.string({required_error: "E-mail is required"}).email(),
			password: z.string({required_error: "Password is required"})
		});
		const validation = schema.safeParse(request.body);
		if(!validation.success) {
			throw new BadRequestError("Validation error",validation.error.issues.map(error => ({message:error.message})));
		}
		const {token, user} = await this.userLoginUseCase.execute(validation.data);
		request.session = {
			token
		};
		return response.status(200).json({token, user : {...user, password: undefined} });
	}
}

