import { decryptAES, encryptAES } from "encrypt-file-ts"
import configs from "../core/configs"
import fs from "fs/promises"

export async function encryptFile(filePath: string) {
	const file = await fs.readFile(filePath)
	return encryptAES(file, configs.encrypt.secretKey)
}

export async function decryptFile(filePath: string) {
	const file = await fs.readFile(filePath)
	return decryptAES(file, configs.encrypt.secretKey)
}
