import { Review, ReviewStatus } from "@prisma/client"
import { ConflictError, UnprocessableEntityError } from "../../core/http"
import { prisma } from "../../core/prisma"

export async function updateReview({
	filter: { id },
	update: { status, userNote } = {},
}: {
	filter: { id: number; userId?: number; lawyerId?: number }
	update?: { userNote?: string | null; status?: ReviewStatus }
}): Promise<Review> {
	const review = await prisma.review.findFirst({ where: { id } })
	if (!review) throw new UnprocessableEntityError("Invalid review")

	const isReviewClosed = review.status === ReviewStatus.CLOSED
	if (isReviewClosed) throw new ConflictError("Update not allowed in closed review")

	return await prisma.review.update({
		where: { id },
		data: {
			...(userNote && { userNote }),
			...(status && { status }),
		},
	})
}
