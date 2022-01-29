import { Admin } from "@prisma/client"
import { generateHash } from "../../helpers/hash"
import { prisma } from "../../core/prisma"
import { checkAdminUsernameAvailability } from "./checkAdminUsernameAvailability"

export async function createAdmin({
	username,
	password,
}: {
	username: string
	password: string
}): Promise<Admin> {
	await checkAdminUsernameAvailability(username)
	const hashedPassword = await generateHash(password)
	return await prisma.admin.create({ data: { username, hashedPassword } })
}
