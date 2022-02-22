import { prisma } from "../../core/prisma"

export async function getAllReviewPayments({
	reviewIds,
}: {
	reviewIds: any
}): Promise<any> {
	return await prisma.reviewPayment.findMany({
		where: {
			reviewId: { in: reviewIds },
		},
	})
}
