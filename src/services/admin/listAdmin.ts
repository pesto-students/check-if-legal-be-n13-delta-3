import { Admin, PrismaClient } from "@prisma/client"

export async function listAdmin({
	filter,
}: {
	filter?: { id?: number; username?: string }
} = {}): Promise<Admin[]> {
	const prisma = new PrismaClient()
	return await prisma.admin.findMany({ orderBy: { username: "asc" }, where: filter })
}
