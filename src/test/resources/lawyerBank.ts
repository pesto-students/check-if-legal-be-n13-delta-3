import { randAccount, randBrand } from "@ngneat/falso"
import { upsertLawyerBank } from "../../services/lawyerBank/upsertLawyerBank"
import { randomBankIfsc } from "./bank"
import { generateLawyer } from "./lawyer"

export async function generateLawyerBank({
	lawyerId,
}: {
	lawyerId?: number
} = {}) {
	if (!lawyerId) lawyerId = (await generateLawyer({ isVerified: true })).id
	const bankName = randBrand()
	const bankIfsc = randomBankIfsc()
	const accountNumber = randAccount()

	return await upsertLawyerBank({ lawyerId }, { bankIfsc, bankName, accountNumber })
}
