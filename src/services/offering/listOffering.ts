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
	include?: { lawyer?: boolean; paperType?: boolean }
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
		},
		include,
	})
}
