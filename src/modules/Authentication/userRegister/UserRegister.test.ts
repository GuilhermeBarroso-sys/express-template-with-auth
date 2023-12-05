import supertest from "supertest";
import {app} from "../../../app";
describe("Testing user sign in feature", () => {
	
	it("Should throw an error if the user doesn't provide required params", async () => {
		await supertest(app)
			.post("/auth/register")
			.send({
				email: "test"
			})
			.expect(400);
	});

	it("Should throw an error if the user already exist", async () => {
		await supertest(app)
			.post("/auth/register")
			.send({
				name: "test",
				email: "testttt@gmail.com",
				password: "test123"
			})
			.expect(201);
		await supertest(app)
			.post("/auth/register")
			.send({
				name: "test",
				email: "testttt@gmail.com",
				password: "test123"
			})
			.expect(409);
	});
	it("Should register a user", async () => {
		await supertest(app)
			.post("/auth/register")
			.send({
				name: "testtt",
				email: "testttt@gmail.com",
				password: "test1234"
			})
			.expect(201);
	});
});