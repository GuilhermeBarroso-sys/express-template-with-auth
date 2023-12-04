import { Request, Response } from "express";
import { UserRegisterUseCase } from "./UserRegisterUseCase";
import { z } from "zod";
import { BadRequestError } from "../../../errors/BadRequestError";
import {Password} from "@gbarrosodev/gpwd/dist";
export class UserRegisterController {
	constructor(private userRegisterUseCase : UserRegisterUseCase) {}
	async handle(request: Request, response: Response) {
		const schema = z.object({
			id: z.string().uuid().optional(),
			name: z.string({required_error: "Name is required"}),
			email: z.string({required_error: "E-mail is required"}).email(),
			password: z.string({required_error: "Password is required"}).min(4, "password minimum length is 4").transform((password) => Password.hashPassword({password, salt: 10}))
		});
		const validation = schema.safeParse(request.body);
		if(!validation.success) {
			throw new BadRequestError("Validation error",validation.error.issues.map(error => ({message:error.message})));
		}
		const {token} = await this.userRegisterUseCase.execute(validation.data);
		request.session = {
			token
		};
		return response.status(201).json({token});
	}
}

