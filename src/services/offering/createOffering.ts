import { Offering } from "@prisma/client"
import { UnprocessableEntityError } from "../../core/http"
import { prisma } from "../../core/prisma"

export async function createOffering(payload: {
	lawyerId: number
	paperTypeId: number
	languageId: number
	expectedTimeInHours: number
	price: number
	description?: string
	isAvailable?: boolean
}): Promise<Offering> {
	const lawyer = await prisma.lawyer.findFirst({ where: { id: payload.lawyerId } })
	if (!lawyer) throw new UnprocessableEntityError("Invalid lawyer")
	if (!lawyer.isVerified) throw new UnprocessableEntityError("Lawyer is not verified")

	return await prisma.offering.create({ data: payload })
}
