import { z } from "zod"
import { AuthRole } from "../../core/enums"
import { HttpApi, HttpMethod, UnprocessableEntityError } from "../../core/http"
import { userAuth } from "../../helpers/auth/userAuth"
import { checkLawyerAuthorization } from "../../services/lawyer/checkLawyerAuthorization"
import { updateLawyer } from "../../services/lawyer/updateLawyer"

const bodySchema = z
	.object({
		name: z.string().max(100).optional(),
		cityId: z.number().optional(),
		address: z.string().max(400).optional(),
		description: z.string().max(400).optional(),
		phone: z.string().max(20).optional(),
	})
	.strict()

export const apiLawyerSelfUpdate = new HttpApi({
	method: HttpMethod.PATCH,
	endpoint: "/lawyer/self",
	bodySchema,
	handler: async ({ req, body }) => {
		const { id } = userAuth(req, [AuthRole.LAWYER])
		const lawyer = await checkLawyerAuthorization(id)
		if (lawyer.isVerified) {
			throw new UnprocessableEntityError(
				"Verified Lawyer details cannot be updated",
			)
		}

		await updateLawyer({ filter: { id: lawyer.id }, update: body })
	},
})
