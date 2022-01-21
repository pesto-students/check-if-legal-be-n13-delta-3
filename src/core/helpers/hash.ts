import { hash, compare } from "bcrypt"

export async function generateHash(data: string) {
	return await hash(data, 10)
}

export async function verifyHash(data: string, hashedData: string) {
	return await compare(data, hashedData)
}
