import { User } from "@prisma/client"
import { prisma } from "../../core/prisma"

export async function listUser({
	filter,
}: {
	filter?: { id?: number; isSuspended?: boolean; isLawyer?: boolean }
} = {}): Promise<User[]> {
	return await prisma.user.findMany({ orderBy: { name: "asc" }, where: filter })
}
