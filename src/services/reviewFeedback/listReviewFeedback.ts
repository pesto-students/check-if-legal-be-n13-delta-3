import { ReviewFeedback } from "@prisma/client"
import { prisma } from "../../core/prisma"

export async function listReviewFeedback({
	filter,
	include,
}: {
	filter?: { id?: number; reviewId?: number; byLawyer?: boolean }
	include?: { review: true }
} = {}): Promise<ReviewFeedback[]> {
	return await prisma.reviewFeedback.findMany({
		where: filter,
		include,
	})
}
