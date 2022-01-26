import { Admin } from "@prisma/client"
import { prisma } from "../../core/prisma"

export async function listAdmin({
	filter,
}: {
	filter?: { id?: number; username?: string }
} = {}): Promise<Admin[]> {
	return await prisma.admin.findMany({ orderBy: { username: "asc" }, where: filter })
}
