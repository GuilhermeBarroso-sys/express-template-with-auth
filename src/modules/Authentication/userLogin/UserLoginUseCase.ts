import { sign } from "jsonwebtoken";
import { IUserRepository } from "../userRepository";
import { NotFoundError } from "../../../errors/NotFoundError";

import { NotAuthorized } from "../../../errors/NotAuthorizedError";
import { Password } from "@gbarrosodev/gpwd/dist";
interface ILoginUserParams {
  email: string
  password: string
}
export class UserLoginUseCase {
	constructor(private userRepository : IUserRepository) {}
	async execute({email,password} : ILoginUserParams) {

		const user = await this.userRepository.findByEmail({email});
		if(!user) {
			throw new NotFoundError("Not found Error");
		}
		const validPassword = Password.verifyPassword({password, hashedPassword: user.password});
		if(!validPassword) {
			throw new NotAuthorized("Invalid Credentials");
		}

		const token = sign({id: user.id}, process.env.JWT_KEY!);
		return {token, user};
      
	}
}