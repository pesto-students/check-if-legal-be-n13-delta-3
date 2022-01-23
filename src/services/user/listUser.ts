import { PrismaClient, User } from "@prisma/client"

export async function listUser({
	filter,
}: {
	filter?: { id?: number; isSuspended?: boolean }
} = {}): Promise<User[]> {
	const prisma = new PrismaClient()
	return await prisma.user.findMany({ orderBy: { name: "asc" }, where: filter })
}
