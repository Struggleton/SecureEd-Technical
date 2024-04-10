import { EncryptService } from "../config/encrypt";
import { GetPasswordsQuery, Password } from "../shared/types";
import { IDatabase } from "./idatabase";

export class Database implements IDatabase {
	private static _instance: IDatabase;
	private passwords: Password[] = [];

	private constructor() {
		// Load in passwords from json file
		const savedPasswords = require("../../passwords/passwords.json");
		for (const savedPassword of savedPasswords["savedPasswords"]) {
			// Encrypt the password
			const encrypted = EncryptService.encryptPassword(savedPassword.password);
			savedPassword.password = encrypted;
			this.passwords.push(savedPassword);
		}
	}

	/**
	 * Initializes the database using the singleton design pattern.
	 * More information about the singleton design pattern can be found at:
	 * https://en.wikipedia.org/wiki/Singleton_pattern
	 * @returns The instance of the database.
	 */
	public static getInstance(): IDatabase {
		if (this._instance == null)
			this._instance = new Database();

		return this._instance;
	}

	public getPasswords(query: GetPasswordsQuery): Password[] {
		const { username, website, id } = query;

		let queriedPasswords: Password[] = [];
		
		this.passwords.forEach((password) => { 
			if ((!username || username == password.username) &&
            	(!website || password.website == website) &&
				(!id || password.id == id)) {
				 // Create a copy of the password object so
				 // we don't modify the original password object
				 const decryptedPassword = { ...password };
				 // Decrypt password
				 decryptedPassword.password = EncryptService.decryptPassword(password.password);
				 // Push the decrypted password to queriedPasswords
				 queriedPasswords.push(decryptedPassword);
        	}
		});
 		
		return queriedPasswords;
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
