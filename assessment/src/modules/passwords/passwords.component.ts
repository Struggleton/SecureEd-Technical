import { randomUUID } from "crypto";
import { EncryptService } from "../../config/encrypt";
import { Database } from "../../database/database";
import { IDatabase } from "../../database/idatabase";
import { ServiceError, ServiceErrorType } from "../../shared/error";
import { GetPasswordsQuery, Password } from "../../shared/types";

export class PasswordManagerComponent {
	private constructor(private database: IDatabase) {}

	private throwError(errorType: ServiceErrorType, errorMessage: string): never {
		throw new ServiceError(
			errorType,
			errorMessage
		);
	}

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
		if (!newPassword.username) {
			this.throwError(ServiceErrorType.BAD_REQUEST, "Username is required")
		}

		if (!newPassword.website) {
			this.throwError(ServiceErrorType.BAD_REQUEST, "Website is required")
		}
			
		if (!newPassword.password) {
			this.throwError(ServiceErrorType.BAD_REQUEST, "Password is required")
		}
			
		// Create id 
		newPassword.id = randomUUID();
		// Save the new password
		this.database.createPassword({
			...(newPassword as Password),
			// Encrypt password
			password: EncryptService.encryptPassword(newPassword.password!)
		});

		// Return the password's ID
		return newPassword.id;
	}

	public updatePassword(id: string, updates: Partial<Password>) {
		// Check if the password exists
		const password = this.database.getPassword(id);
		if (!password) 
			this.throwError(ServiceErrorType.NOT_FOUND,"Password not found!")

		// Validate if the request body has an id tag
		if (updates.id) {
			this.throwError(ServiceErrorType.BAD_REQUEST, "The ID field cannot be updated")
		}

		// Check if update files are null/undefined
		updates.username ?? this.throwError(ServiceErrorType.BAD_REQUEST, "Username field is required")
		updates.website ?? this.throwError(ServiceErrorType.BAD_REQUEST, "Website field is required")
		updates.password ?? this.throwError(ServiceErrorType.BAD_REQUEST, "Password field is required")

		// Check fields for empty strings. If they are not empty
		// apply the update
		if (updates.password) {
			// Encrypt the updated password
			password.password = EncryptService.encryptPassword(updates.password);
		}

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
		// Try to delete the password. Get the index of the password deleted
		const index = this.database.deletePassword(id);

		// If it equals -1, throw a service error because the password does 
		// not exist
		if (index === -1){
			this.throwError(ServiceErrorType.NOT_FOUND, "Password not found in list!");
		}
	}
}
