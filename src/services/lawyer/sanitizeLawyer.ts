import { Lawyer } from "@prisma/client"

export function sanitizeLawyer(lawyer: Lawyer) {
	// @ts-ignore
	lawyer.phone = undefined
	// @ts-ignore
	lawyer.ratingPoints = undefined
	// @ts-ignore
	lawyer.userId = undefined
	// @ts-ignore
	lawyer.createdAt = undefined
	// @ts-ignore
	lawyer.updatedAt = undefined
	// @ts-ignore
	lawyer.isSuspended = undefined

	return lawyer
}
