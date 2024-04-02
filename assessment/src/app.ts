import * as http from "http";
import { ExpressConfig } from "./config/express-config";
import { EnvConfig } from "./config/env";

EnvConfig.init();

const app = ExpressConfig.build();
const server = http.createServer(app);
const port = EnvConfig.get("PORT");

server.listen(port, () => {
	console.log(`Server running on port ${port}`);
});

server.on("listening", async () => {});
