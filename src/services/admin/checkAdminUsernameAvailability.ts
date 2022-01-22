import { PrismaClient } from "@prisma/client"
import { UnprocessableEntityError } from "../../core/http"

export async function checkAdminUsernameAvailability(username: string) {
	const prisma = new PrismaClient()
	const admin = await prisma.admin.findFirst({ where: { username } })
	if (!admin) return
	throw new UnprocessableEntityError(`Admin with username ${username} already exists`)
}
