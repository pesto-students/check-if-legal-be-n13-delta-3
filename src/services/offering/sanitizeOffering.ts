import { Offering } from "@prisma/client"
import { sanitizeLawyer } from "../lawyer/sanitizeLawyer"

export function sanitizeOffering(offering: Offering, isGuestUser: boolean) {
	if (isGuestUser) {
		// @ts-ignore
		offering.price = undefined
	}

	// @ts-ignore
	offering.createdAt = undefined
	// @ts-ignore
	offering.updatedAt = undefined
	// @ts-ignore
	offering.lawyer = sanitizeLawyer(offering.lawyer)

	return offering
}
