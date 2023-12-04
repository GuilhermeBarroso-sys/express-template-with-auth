import { PrismaClient } from "@prisma/client";
import { ICreateUserParams, IFindByEmail, IFindUser, IFindUserParams, IUserRepository } from "..";

export class UserPrismaRepository implements IUserRepository {
	private prisma : PrismaClient;
	constructor(prisma : PrismaClient) {
		this.prisma = prisma;
	}
	async create({id,name,email,password} : ICreateUserParams) : Promise<string>  {
		const user = await this.prisma.user.create({
			data: {
				id: id ?? undefined,
				name,
				email,
				password
			}
		});
		return user.id;
    
	}
	async find({id} : IFindUserParams) : Promise<IFindUser> {
		const user = await this.prisma.user.findFirst({
			where: { id }
		});
		return user;
	}
	async findByEmail({email}: IFindByEmail) : Promise<IFindUser> {
		const user = await this.prisma.user.findFirst({
			where: { email }
		});
		return user;
	}
}