import { prisma } from "../core/prisma"

export async function truncateDatabase() {
	await prisma.admin.deleteMany()
	await prisma.googleOAuth.deleteMany()
	await prisma.offering.deleteMany()
	await prisma.lawyerBank.deleteMany()
	await prisma.reviewFeedback.deleteMany()
	await prisma.reviewPayment.deleteMany()
	await prisma.reviewRating.deleteMany()
	await prisma.reviewDocument.deleteMany()
	await prisma.review.deleteMany()
	await prisma.review.deleteMany()
	await prisma.lawyer.deleteMany()
	await prisma.user.deleteMany()
	await prisma.city.deleteMany()
	await prisma.state.deleteMany()
	await prisma.language.deleteMany()
	await prisma.paperType.deleteMany()
}
