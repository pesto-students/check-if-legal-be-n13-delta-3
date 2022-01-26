import { User } from "@prisma/client"
import { prisma } from "../../core/prisma"

export async function createUser({
	name,
	isLawyer,
	isSuspended,
}: {
	name: string
	isLawyer?: boolean
	isSuspended?: boolean
}): Promise<User> {
	return await prisma.user.create({ data: { name, isLawyer, isSuspended } })
}
