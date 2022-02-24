import { prisma } from "../../core/prisma"

export async function getReviewPaymentCount({
	filter: { userId } = {},
}: {
	filter?: { userId?: number }
}): Promise<number> {
	return await prisma.reviewPayment.count({
		where: { ...(userId && { review: { userId } }) },
		orderBy: { createdAt: "desc" },
	})
}
