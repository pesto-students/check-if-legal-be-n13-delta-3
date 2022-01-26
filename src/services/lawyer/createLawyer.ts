import { Lawyer, PrismaClient } from "@prisma/client"
import { UnprocessableEntityError } from "../../core/http"

export async function createLawyer({
	name,
	address,
	cityId,
	phone,
	userId,
	description,
	isSuspended,
	isAvailable,
	isVerified,
}: {
	userId: number
	name: string
	address: string
	phone: string
	cityId: number
	description?: string
	isSuspended?: boolean
	isAvailable?: boolean
	isVerified?: boolean
}): Promise<Lawyer> {
	const prisma = new PrismaClient()

	const user = await prisma.user.findFirst({ where: { id: userId } })
	if (!user) throw new UnprocessableEntityError("Invalid user")
	if (!user.isLawyer) throw new UnprocessableEntityError("User is not a lawyer")

	return await prisma.lawyer.create({
		data: {
			userId,
			name,
			address,
			phone,
			cityId,
			description,
			isSuspended,
			isAvailable,
			isVerified,
		},
	})
}
