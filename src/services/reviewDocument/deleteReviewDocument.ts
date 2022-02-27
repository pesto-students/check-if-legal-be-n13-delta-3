import { prisma } from "../../core/prisma"

export async function deleteReviewDocument({
	filter,
}: {
	filter: { reviewId: number; documentName: string }
}): Promise<void> {
	const reviewDocument = await prisma.reviewDocument.findFirst({ where: filter })
	if (!reviewDocument) return
	await prisma.reviewDocument.delete({ where: { id: reviewDocument.id } })
}
