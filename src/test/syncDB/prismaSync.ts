import { exec } from "node:child_process";

const syncDB = () => {
	return new Promise((res,rej) => {
		exec("npx prisma db push", (err) => {
			if(err) {
				rej(err);
			}
			
			res(null);
		});
	});
};

try {
	process.env.DATABASE_URL= "postgresql://postgres:postgrespwd@localhost:5432/smarthome_test";
	syncDB();
} catch(err) {
	console.error(err);
}
	