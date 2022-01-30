import { createReview } from "../../services/review/createReview"
import { generateOffering } from "./offering"
import { generateUser } from "./user"

export async function generateReview({
	lawyerId,
	offeringId,
	userId,
	paperTypeId,
	languageId,
}: {
	lawyerId?: number
	offeringId?: number
	userId?: number
	paperTypeId?: number
	languageId?: number
} = {}) {
	if (!offeringId) {
		offeringId = (await generateOffering({ lawyerId, paperTypeId, languageId })).id
	}
	if (!userId) userId = (await generateUser()).id

	return await createReview({ userId, offeringId })
}
