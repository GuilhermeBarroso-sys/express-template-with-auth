import { sign } from "jsonwebtoken";
import { ICreateUserParams, IUserRepository } from "../userRepository";
import { BadRequestError } from "../../../errors/BadRequestError";

export class UserRegisterUseCase {
	constructor(private userRepository : IUserRepository) {}
	async execute(user : ICreateUserParams) {
		const userAlreadyExists = await this.userRepository.findByEmail({email: user.email});
		if(userAlreadyExists) {
			throw new BadRequestError("E-mail Already in use", [{message: "User Already Exist"}]);
		}
		const id = await this.userRepository.create(user);
		const token = sign({id}, process.env.JWT_KEY!);
		return {token};		
	}
}