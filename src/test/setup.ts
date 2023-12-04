import { randomUUID } from "crypto";
import { sign } from "jsonwebtoken";
import { UserPrismaRepository } from "../modules/Authentication/userRepository/implements/UserPrismaRepository";
import { prisma, prisma as prismaClient } from "../prisma";
import { Password } from "@gbarrosodev/gpwd/dist";


export const getMockedCookie = () => {
	const payload = {
		id: randomUUID(),
		name: "test",
		email: "test@gmail.com"
	};
	const token =  sign(payload, process.env.JWT_KEY as string);
	const session = {token};
	const sessionJSON = JSON.stringify(session);
	const base64 = Buffer.from(sessionJSON).toString("base64");
	return [`session=${base64}`];
};
beforeAll(async () => {
	process.env.JWT_KEY = "test";
	process.env.DATABASE_URL="postgresql://postgres:postgrespwd@localhost:5432/smarthome_test";	
});

export async function signIn() {
	const prisma = new UserPrismaRepository(prismaClient);
	const payload = {
		id: randomUUID(),
		email: "test@gmail.com",
		name: "test",
		password: Password.hashPassword({password: "test"}),
	};
	await prisma.create(payload);
	const token =  sign(payload, process.env.JWT_KEY as string);
	const session = {token};
	const sessionJSON = JSON.stringify(session);
	const base64 = Buffer.from(sessionJSON).toString("base64");
	return {user: payload, cookie:[`session=${base64}`]};
} 
afterEach(async () => {
	await prisma.user.deleteMany();

});