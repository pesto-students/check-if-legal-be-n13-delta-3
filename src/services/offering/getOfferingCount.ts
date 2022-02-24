import _ from "lodash"
import { prisma } from "../../core/prisma"

export async function getOfferingCount({
	filter: {
		id,
		cityId,
		lawyerId,
		isLawyerAvailable,
		languageId,
		maxPrice,
		paperTypeId,
		isAvailable,
	} = {},
}: {
	filter?: {
		id?: number
		lawyerId?: number
		isLawyerAvailable?: boolean
		paperTypeId?: number
		languageId?: number
		cityId?: number
		maxPrice?: number
		isAvailable?: boolean
	}
} = {}): Promise<number> {
	return await prisma.offering.count({
		where: {
			...(id && { id }),
			...(lawyerId && { lawyerId }),
			...(cityId && { lawyer: { cityId } }),
			...(paperTypeId && { paperTypeId }),
			...(languageId && { languageId }),
			...(maxPrice && { price: { gte: maxPrice } }),
			...(_.isBoolean(isAvailable) && { isAvailable }),
			lawyer: {
				isSuspended: false,
				...(_.isBoolean(isLawyerAvailable) && { isAvailable: isLawyerAvailable }),
				...(cityId && { cityId }),
			},
		},
	})
}
