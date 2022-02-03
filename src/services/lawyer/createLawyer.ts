import { Lawyer } from "@prisma/client"
import { ConflictError, UnprocessableEntityError } from "../../core/http"
import { prisma } from "../../core/prisma"

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
	const user = await prisma.user.findFirst({
		where: { id: userId },
		include: { lawyer: true },
	})
	if (!user) {
		throw new UnprocessableEntityError("Invalid user")
	}
	if (!user.isLawyer) {
		throw new UnprocessableEntityError("User is not a lawyer")
	}
	if (user.lawyer) {
		throw new ConflictError("Lawyer registration already exists")
	}

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
