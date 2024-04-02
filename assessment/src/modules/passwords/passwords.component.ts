import { randomUUID } from "crypto";
import { EncryptService } from "../../config/encrypt";
import { Database } from "../../database/database";
import { IDatabase } from "../../database/idatabase";
import { ServiceError, ServiceErrorType } from "../../shared/error";
import { GetPasswordsQuery, Password } from "../../shared/types";

export class PasswordManagerComponent {
	private constructor(private database: IDatabase) {}

	public static build(): PasswordManagerComponent {
		const database = Database.getInstance();

		return new PasswordManagerComponent(database);
	}

	public getPasswords(query: GetPasswordsQuery): Password[] {
		// Get the passwords
		const passwords = this.database.getPasswords(query);
		return passwords;
	}

	public createPassword(newPassword: Partial<Password>): string {
		// Validate the new password
		if (!newPassword.password) {
			throw new ServiceError(
				ServiceErrorType.BAD_REQUEST,
				"Password is required"
			);
		}
		if (!newPassword.username) {
			throw new ServiceError(
				ServiceErrorType.BAD_REQUEST,
				"Username is required"
			);
		}

		// Encrypt the new password
		const encrypted = EncryptService.encryptPassword(newPassword.password);

		// Create id
		newPassword.id = randomUUID();
		// Save the new password
		this.database.createPassword({
			...(newPassword as Password),
			password: encrypted,
		});

		console.log(encrypted);
		return newPassword.username;
	}

	public updatePassword(id: string, updates: Partial<Password>) {
		// Check if the password exists
		const password = this.database.getPassword(id);
		if (!password) {
			throw new ServiceError(ServiceErrorType.NOT_FOUND, "Password not found");
		}

		// Validate the updated password
		if (updates.id) {
			throw new ServiceError(
				ServiceErrorType.BAD_REQUEST,
				"ID cannot be updated"
			);
		}

		// Encrypt the updated password
		if (updates.password) {
			password.password = password.password;
		}
		// Apply updates
		if (updates.username) {
			password.username = updates.username;
		}
		if (updates.website) {
			password.website = updates.website;
		}

		// Save the updated password
		this.database.updatePassword(password);
	}

	public deletePassword(id: string) {
		// Delete the password
		this.database.deletePassword(id);
	}
}
