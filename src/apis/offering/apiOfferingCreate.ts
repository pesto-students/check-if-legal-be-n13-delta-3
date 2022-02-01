import { z } from "zod"
import { AuthRole } from "../../core/enums"
import { createdResponse, ForbiddenError, HttpApi, HttpMethod } from "../../core/http"
import { userAuth } from "../../helpers/auth/userAuth"
import { listLawyer } from "../../services/lawyer/listLawyer"
import { createOffering } from "../../services/offering/createOffering"

const bodySchema = z
	.object({
		paperTypeId: z.number().int(),
		languageId: z.number().int(),
		description: z.string().max(1000).optional(),
		expectedTimeInHours: z.number().int().positive(),
		price: z.number().positive(),
	})
	.strict()

export const apiOfferingCreate = new HttpApi({
	method: HttpMethod.POST,
	endpoint: "/offering",
	bodySchema,
	handler: async ({ req, body }) => {
		const { id: userId } = userAuth(req, [AuthRole.LAWYER])
		const [lawyer] = await listLawyer({ filter: { userId } })
		if (!lawyer) throw new ForbiddenError("Invalid Lawyer")
		if (lawyer.isSuspended) throw new ForbiddenError("Lawyer is suspended")

		const offering = await createOffering({ ...body, lawyerId: lawyer.id })
		return createdResponse({ id: offering.id })
	},
})
