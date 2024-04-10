import { NextFunction, Request, Response, Router } from "express";
import { PasswordManagerComponent } from "./passwords.component";
import { GetPasswordsQuery } from "../../shared/types";

export class PasswordsRoutehandler {
	public static build(): Router {
		const router = Router();

		router.get("/passwords", this.getPasswords);
		router.post("/passwords", this.createPassword);
		router.patch("/passwords/:id", this.updatePassword);
		router.delete("/passwords/:id", this.deletePassword);

		return router;
	}

	private static getPasswords(req: Request, res: Response, next: NextFunction) {
		try {
			const query: GetPasswordsQuery = {
				username: req.query.username as string,
				website: req.query.website as string,
				id: req.query.id as string,
			};
			const passwords = PasswordManagerComponent.build().getPasswords(query);
			res.send(passwords);
		} catch (error) {
			next(error);
		}
	}

	private static createPassword(
		req: Request,
		res: Response,
		next: NextFunction
	) {
		try {
			const password = PasswordManagerComponent.build().createPassword(
				req.body
			);
			res.send(password);
		} catch (error) {
			next(error);
		}
	}

	private static updatePassword(
		req: Request,
		res: Response,
		next: NextFunction
	) {
		try {
			PasswordManagerComponent.build().updatePassword(req.params.id, req.body);
			res.status(204).json({ message: "Password updated" });
		} catch (error) {
			next(error);
		}
	}

	private static deletePassword(
		req: Request,
		res: Response,
		next: NextFunction
	) {
		try {
			PasswordManagerComponent.build().deletePassword(req.params.id);
			res.status(204).json({ message: "Password deleted" });
		} catch (error) {
			next(error);
		}
	}
}
