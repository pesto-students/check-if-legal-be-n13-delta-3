import { prisma } from "../../core/prisma"

export async function upsertReviewDocument(payload: {
	reviewId: number
	documentName: string
}): Promise<void> {
	const reviewDocument = await prisma.reviewDocument.findFirst({ where: payload })
	if (reviewDocument) return
	await prisma.reviewDocument.create({ data: payload })
}
