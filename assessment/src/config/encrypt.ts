import * as crypto from "crypto";
import { EnvConfig } from "./env";

export class EncryptService {
	/**
	 * Encrypts a password using AES-256-CBC
	 * @param password The password to encrypt
	 * @returns The encrypted password with the IV appended to it
	 */
	public static encryptPassword(password: string): string {
		const key = EnvConfig.get(EnvConfig.ENC_KEY);
		const iv = crypto.randomBytes(16);
		const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
		let encrypted = cipher.update(password, "utf8", "hex");
		encrypted += cipher.final("hex");

		return `${encrypted}:${iv.toString("hex")}`;
	}

	/**
	 * Decrypts an encrypted password
	 * @param encrypted The encrypted password with the IV appended to it
	 * @returns The decrypted password
	 */
	public static decryptPassword(encrypted: string): string {
		const key = EnvConfig.get(EnvConfig.ENC_KEY);
		const [password, iv] = encrypted.split(":");
		const decipher = crypto.createDecipheriv(
			"aes-256-cbc",
			key,
			Buffer.from(iv, "hex")
		);
		let decrypted = decipher.update(password, "hex", "utf8");
		decrypted += decipher.final("utf8");

		return decrypted;
	}
}
