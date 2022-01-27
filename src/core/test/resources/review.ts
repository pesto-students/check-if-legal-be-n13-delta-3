import { createReview } from "../../../services/review/createReview"
import { generateLawyer } from "./lawyer"
import { generateOffering } from "./offering"
import { generateUser } from "./user"

export async function generateReview({
	lawyerId,
	offeringId,
	userId,
}: { lawyerId?: number; offeringId?: number; userId?: number } = {}) {
	if (!lawyerId) lawyerId = (await generateLawyer()).id
	if (!offeringId) offeringId = (await generateOffering({ lawyerId })).id
	if (!userId) userId = (await generateUser()).id

	return await createReview({ userId, offeringId })
}
