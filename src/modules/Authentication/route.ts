import express from "express";
import { UserRegisterFactory } from "./userRegister/UserRegisterFactory";
import { UserLoginFactory } from "./userLogin/UserLoginFactory";
const authenticationRoutes =  express.Router();

authenticationRoutes.post("/register", (request, response) => UserRegisterFactory().handle(request,response));
authenticationRoutes.post("/login", (request, response) => UserLoginFactory().handle(request,response));



export { authenticationRoutes };