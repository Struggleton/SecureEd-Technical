import { EncryptService } from "../config/encrypt";
import { GetPasswordsQuery, Password } from "../shared/types";
import { IDatabase } from "./idatabase";

export class Database implements IDatabase {
	private static _instance: IDatabase;

	private passwords: Password[] = [];

	private constructor() {
		// Load in passwords from json file
		const passwords = require("../../passwords/passwords.json");
		for (const password of passwords["savedPasswords"]) {
			// Encrypt the password
			const encrypted = EncryptService.encryptPassword(password.password);
			password.password = encrypted;
			this.passwords.push(password);
		}
		console.log(this.passwords);
	}

	/**
	 * Initializes the database using the singleton design pattern.
	 * More information about the singleton design pattern can be found at:
	 * https://en.wikipedia.org/wiki/Singleton_pattern
	 * @returns The instance of the database.
	 */
	public static getInstance(): IDatabase {
		return new Database();
	}

	public getPasswords(query: GetPasswordsQuery): Password[] {
		const { username, website, id } = query;
		let passwords = this.passwords;

		if (username) {
			passwords = passwords.filter(
				(password) => password.username === username
			);
		}

		if (website) {
			passwords = passwords.filter((password) => password.website === website);
		}

		return this.passwords;
	}

	public createPassword(newPassword: Password): void {
		this.passwords.push(newPassword);
	}

	public getPassword(id: string): Password | undefined {
		return this.passwords.find((password) => password.id === id);
	}

	public updatePassword(updatedPassword: Password): void {
		// Find the index of the password to update
		const index = this.passwords.findIndex(
			(password) => password.id === updatedPassword.id
		);
		// Update the password
		this.passwords[index] = updatedPassword;
	}

	public deletePassword(id: string): void {
		// Find the index of the password to delete
		const index = this.passwords.findIndex((password) => password.id === id);
		// Delete the password
		this.passwords.splice(index, 1);
	}
}
