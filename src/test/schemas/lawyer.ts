import { expect } from "chai"
import { AuthRole } from "../../core/enums"

export function expectLawyerSchema(data: any, role: AuthRole) {
	const toSanitize = role === AuthRole.USER

	expect(data).to.be.an("object")
	expect(data).to.have.keys(
		"id",
		"name",
		"address",
		"description",
		"isVerified",
		"isSuspended",
		"averageRating",
		"isAvailable",
		"cityId",
		"city",
		...(!toSanitize
			? ["phone", "ratingPoints", "createdAt", "updatedAt", "userId"]
			: []),
	)
}
