import { PrismaClient, User } from "@prisma/client"

export async function createUser({
	name,
	isLawyer,
	isSuspended,
}: {
	name: string
	isLawyer?: boolean
	isSuspended?: boolean
}): Promise<User> {
	const prisma = new PrismaClient()
	return await prisma.user.create({ data: { name, isLawyer, isSuspended } })
}
