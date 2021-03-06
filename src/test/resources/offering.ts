import { randJobDescriptor, randProduct } from "@ngneat/falso"
import _ from "lodash"
import { createOffering } from "../../services/offering/createOffering"
import { generateLanguage } from "./language"
import { generateLawyer } from "./lawyer"
import { generatePaperType } from "./paperType"

export async function generateOffering({
	languageId,
	lawyerId,
	paperTypeId,
	isAvailable,
}: {
	lawyerId?: number
	paperTypeId?: number
	languageId?: number
	isAvailable?: boolean
} = {}) {
	if (!lawyerId) lawyerId = (await generateLawyer({ isVerified: true })).id
	if (!paperTypeId) paperTypeId = (await generatePaperType()).id
	if (!languageId) languageId = (await generateLanguage()).id

	const description = randJobDescriptor()
	const price = randomOfferingPrice()
	const expectedTimeInHours = randomOfferingTimeDuration()

	return await createOffering({
		lawyerId,
		paperTypeId,
		languageId,
		expectedTimeInHours,
		price,
		description,
		isAvailable,
	})
}

export function randomOfferingPrice() {
	return +randProduct().price
}

export function randomOfferingTimeDuration() {
	return _.random(48, 72)
}
