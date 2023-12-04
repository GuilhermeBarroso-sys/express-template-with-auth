import { prisma } from "../../../prisma";
import { UserPrismaRepository } from "../userRepository/implements/UserPrismaRepository";
import { UserRegisterController } from "./UserRegisterController";
import { UserRegisterUseCase } from "./UserRegisterUseCase";

export function UserRegisterFactory() {
	const prismaRepository = new UserPrismaRepository(prisma);
	const userRegisterUseCase = new UserRegisterUseCase(prismaRepository);
	const userRegisterController = new UserRegisterController(userRegisterUseCase);
	return userRegisterController; 
}