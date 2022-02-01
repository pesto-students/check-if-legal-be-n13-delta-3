import { Offering } from "@prisma/client"
import _ from "lodash"
import { prisma } from "../../core/prisma"

export async function listOffering({
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
	pagination: { limit = 10, pageNo = 1 } = {},
	include,
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
	pagination?: { limit?: number; pageNo?: number }
	include?: { lawyer?: boolean; paperType?: boolean; language?: boolean }
} = {}): Promise<Offering[]> {
	return await prisma.offering.findMany({
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
			...(limit && { take: limit }),
			...(pageNo && { skip: (pageNo - 1) * limit }),
		},
		include,
	})
}
