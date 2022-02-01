import { Offering } from "@prisma/client"
import { prisma } from "../../core/prisma"

export async function updateOffering({
	filter,
	update,
}: {
	filter: { id: number }
	update: {
		paperTypeId?: number
		languageId?: number
		expectedTimeInHours?: number
		price?: number
		description?: string
		isAvailable?: boolean
	}
}): Promise<Offering> {
	return await prisma.offering.update({
		where: filter,
		data: update,
		include: { paperType: true, language: true },
	})
}
