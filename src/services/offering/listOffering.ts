import { Offering, PrismaClient } from "@prisma/client"
import _ from "lodash"

export async function listOffering({
	filter: {
		id,
		cityId,
		lawyerId,
		isLawyerActive,
		languageId,
		maxPrice,
		paperTypeId,
		isActive,
	} = {},
	include,
}: {
	filter?: {
		id?: number
		lawyerId?: number
		isLawyerActive?: boolean
		paperTypeId?: number
		languageId?: number
		cityId?: number
		maxPrice?: number
		isActive?: boolean
	}
	include?: { lawyer?: boolean; paperType?: boolean }
} = {}): Promise<Offering[]> {
	const prisma = new PrismaClient()
	return await prisma.offering.findMany({
		orderBy: { lawyer: { ratingPoints: "desc" }, paperType: { name: "asc" } },
		where: {
			...(id && { id }),
			...(lawyerId && { lawyerId }),
			...(cityId && { lawyer: { cityId } }),
			...(paperTypeId && { paperTypeId }),
			...(languageId && { languageId }),
			...(maxPrice && { price: { gte: maxPrice } }),
			...(_.isBoolean(isActive) && { isActive }),
			lawyer: {
				isSuspended: false,
				...(_.isBoolean(isLawyerActive) && { isActive: isLawyerActive }),
				...(cityId && { cityId }),
			},
		},
		include,
	})
}
