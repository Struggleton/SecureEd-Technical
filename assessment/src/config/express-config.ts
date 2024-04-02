import exp from "express";
import cors from "cors";
import { PasswordsRoutehandler } from "../modules/passwords/passwords.routehandler";
import { ServiceError } from "../shared/error";

export class ExpressConfig {
	private static app = exp();

	public static build() {
		this.app.use(exp.json());
		this.app.use(cors({ origin: true, credentials: true }));
		this.app.set("trust proxy", true);

		this.initServerHome();

		this.app.use(PasswordsRoutehandler.build());

		this.app.use(this.handleError);
		return this.app;
	}

	private static initServerHome() {
		this.app.get("/", (req, res) => {
			res.send("Welcome to the server!");
		});
	}

	private static handleError(
		err: Error,
		req: exp.Request,
		res: exp.Response,
		next: exp.NextFunction
	) {
		console.log(err);
		if (err instanceof ServiceError) {
			res.status(err.statusCode).send(err.message);
		} else {
			res.status(500).send("Internal server error");
		}
	}
}
