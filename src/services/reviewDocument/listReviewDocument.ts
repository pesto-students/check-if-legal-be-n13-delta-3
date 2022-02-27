import { prisma } from "../../core/prisma"

export async function listReviewDocument({
	filter,
}: {
	filter: { reviewId: number }
}): Promise<string[]> {
	const documents = await prisma.reviewDocument.findMany({
		where: filter,
		orderBy: { documentName: "asc" },
	})
	return documents.map((el) => el.documentName)
}
