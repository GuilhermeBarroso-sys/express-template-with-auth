import { Router } from "express";
import { authenticationRoutes } from "../modules/Authentication/route";

const routes = Router();

routes.use("/auth", authenticationRoutes);

export { routes };