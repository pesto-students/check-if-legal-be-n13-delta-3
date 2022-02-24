import { ReviewPayment } from "@prisma/client"
import { prisma } from "../../core/prisma"

export async function listReviewPayment({
	filter: { userId } = {},
	pagination: { limit = 10, pageNo = 1 } = {},
}: {
	filter?: { userId?: number }
	pagination?: { limit?: number; pageNo?: number }
}): Promise<ReviewPayment[]> {
	return await prisma.reviewPayment.findMany({
		where: { ...(userId && { review: { userId } }) },
		orderBy: { createdAt: "desc" },
		...(limit && { take: limit }),
		...(pageNo && { skip: (pageNo - 1) * limit }),
	})
}
