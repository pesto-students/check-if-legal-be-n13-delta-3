import { ReviewRating } from "@prisma/client"
import { prisma } from "../../core/prisma"

export async function listReviewRating({
	filter: { reviewId, lawyerId, userId } = {},
	pagination: { limit = 10, pageNo = 1 } = {},
	include,
}: {
	filter?: { reviewId?: number; userId?: number; lawyerId?: number }
	pagination?: { limit?: number; pageNo?: number }
	include?: { user?: boolean; lawyer?: boolean }
}): Promise<ReviewRating[]> {
	return await prisma.reviewRating.findMany({
		where: {
			reviewId,
			...((lawyerId || userId) && { review: { lawyerId, userId } }),
		},
		orderBy: { createdAt: "desc" },
		include: {
			review: {
				include: {
					paperType: true,
					language: true,
					city: true,
					lawyer: include?.lawyer,
					user: include?.user,
				},
			},
		},
		...(limit && { take: limit }),
		...(pageNo && { skip: (pageNo - 1) * limit }),
	})
}
