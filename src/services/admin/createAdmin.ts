import { Admin, PrismaClient } from "@prisma/client"
import { generateHash } from "../../core/helpers/hash"
import { checkAdminUsernameAvailability } from "./checkAdminUsernameAvailability"

export async function createAdmin({
	username,
	password,
}: {
	username: string
	password: string
}): Promise<Admin> {
	const prisma = new PrismaClient()
	await checkAdminUsernameAvailability(username)
	const hashedPassword = await generateHash(password)
	return await prisma.admin.create({ data: { username, hashedPassword } })
}
