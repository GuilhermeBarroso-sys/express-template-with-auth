import { app } from "./app";

const startServer = (port : number, cb : () => void) => {
	app.listen(port, cb);
};

const PORT = 3000;
startServer(PORT, () => console.log("server started") );