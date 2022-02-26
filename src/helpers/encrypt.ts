import { decryptAES, encryptAES } from "encrypt-file-ts"
import configs from "../core/configs"
import { getFileData } from "./fs"

export async function encryptFile(filePath: string) {
	const file = await getFileData(filePath)
	return encryptAES(file, configs.encrypt.secretKey)
}

export async function decryptFile(filePath: string) {
	const file = await getFileData(filePath)
	return decryptAES(file, configs.encrypt.secretKey)
}
