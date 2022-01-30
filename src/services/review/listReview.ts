import { Review, ReviewStatus } from "@prisma/client"
import { prisma } from "../../core/prisma"

export async function listReview({
	filter: { id, userId, cityId, lawyerId, languageId, paperTypeId, status } = {},
	pagination: { limit = 10, pageNo = 1 } = {},
	include,
}: {
	filter?: {
		id?: number
		userId?: number
		lawyerId?: number
		paperTypeId?: number
		languageId?: number
		cityId?: number
		status?: ReviewStatus
	}
	pagination?: { limit?: number; pageNo?: number }
	include?: {
		lawyer?: boolean
		user?: boolean
		paperType?: boolean
		language?: boolean
		city?: boolean
		feedbacks?: boolean
		rating?: boolean
	}
} = {}): Promise<Review[]> {
	return await prisma.review.findMany({
		where: {
			...(id && { id }),
			...(userId && { userId }),
			...(lawyerId && { lawyerId }),
			...(cityId && { lawyer: { cityId } }),
			...(paperTypeId && { paperTypeId }),
			...(languageId && { languageId }),
			...(status && { status }),
		},
		include,
		orderBy: { createdAt: "desc" },
		...(limit && { take: limit }),
		...(pageNo && { skip: (pageNo - 1) * limit }),
	})
}
