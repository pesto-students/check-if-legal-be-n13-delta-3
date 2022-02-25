import { prisma } from "../../core/prisma"

export async function getReviewRatingCount({
	filter: { reviewId, lawyerId, userId } = {},
}: {
	filter?: { reviewId?: number; userId?: number; lawyerId?: number }
}): Promise<number> {
	return await prisma.reviewRating.count({
		where: {
			reviewId,
			...((lawyerId || userId) && { review: { lawyerId, userId } }),
		},
	})
}
