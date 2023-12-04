import { prisma } from "../../../prisma";
import { UserPrismaRepository } from "../userRepository/implements/UserPrismaRepository";
import { UserLoginController } from "./UserLoginController";
import { UserLoginUseCase } from "./UserLoginUseCase";

export function UserLoginFactory() {
	const prismaRepository = new UserPrismaRepository(prisma);
	const userLoginUseCase = new UserLoginUseCase(prismaRepository);
	const userLoginController = new UserLoginController(userLoginUseCase);
	return userLoginController; 
}