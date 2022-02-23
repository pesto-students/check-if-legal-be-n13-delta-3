import { ReviewRating } from "@prisma/client"
import { prisma } from "../../core/prisma"

export async function listReviewRating({
	filter: { reviewId, lawyerId, userId } = {},
	include,
}: {
	filter?: { reviewId?: number; userId?: number; lawyerId?: number }
	include?: { review?: boolean; user?: boolean; lawyer?: boolean }
}): Promise<ReviewRating[]> {
	return await prisma.reviewRating.findMany({
		where: {
			reviewId,
			...((lawyerId || userId) && { review: { lawyerId, userId } }),
		},
		include,
		orderBy: { createdAt: "desc" },
	})
}
