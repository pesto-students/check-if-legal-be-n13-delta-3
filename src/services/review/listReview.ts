import { Review, ReviewStatus } from "@prisma/client"
import { prisma } from "../../core/prisma"

export async function listReview({
	filter: { id, userId, cityId, lawyerId, languageId, paperTypeId, status } = {},
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
	})
}
