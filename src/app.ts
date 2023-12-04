import "dotenv/config";
import express from "express";
import "express-async-errors";
import cors from "cors";
import cookieSession from "cookie-session";
import { NotFoundError } from "./errors/NotFoundError";
import { errorHandler } from "./middlewares/errorHandler";
import { routes } from "./routes";
const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieSession({
	secure: false,
	signed: false
}));
app.use(routes);
app.all("*", () => {
	throw new NotFoundError("Any endpoint wasn't found.");
});
app.use(errorHandler);

export  { app};
// app.listen(PORT, () => console.log(`Server started at ${PORT}`));