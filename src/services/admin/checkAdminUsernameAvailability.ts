import { ConflictError } from "../../core/http"
import { prisma } from "../../core/prisma"

export async function checkAdminUsernameAvailability(username: string) {
	const admin = await prisma.admin.findFirst({
		where: { username: { equals: username.toLowerCase(), mode: "insensitive" } },
	})
	if (!admin) return
	throw new ConflictError(`Admin with username ${username} already exists`)
}
