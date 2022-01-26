import { Review } from "@prisma/client"
import { ForbiddenError, UnprocessableEntityError } from "../../core/http"
import { prisma } from "../../core/prisma"

export async function createReview({
	userId,
	offeringId,
}: {
	userId: number
	offeringId: number
}): Promise<Review> {
	const user = await prisma.user.findFirst({ where: { id: userId } })
	if (!user) throw new UnprocessableEntityError("Invalid offering")
	if (user.isSuspended) {
		throw new ForbiddenError("User is not allowed to create review")
	}

	const service = await prisma.offering.findFirst({
		where: { id: offeringId, isAvailable: true },
		include: { language: true, lawyer: { include: { city: true } }, paperType: true },
	})
	if (!service) throw new UnprocessableEntityError("Invalid offering")
	if (service.lawyer.isSuspended) {
		throw new UnprocessableEntityError("Lawyer is currently suspended")
	}
	if (!service.lawyer.isAvailable) {
		throw new UnprocessableEntityError("Lawyer is currently not taking reviews")
	}

	return await prisma.review.create({
		data: {
			userId,
			lawyerId: service.lawyerId,
			cityId: service.lawyer.cityId,
			paperTypeId: service.paperTypeId,
			languageId: service.languageId,
			price: service.price,
		},
	})
}
