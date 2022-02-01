import { z } from "zod"
import { AuthRole } from "../../core/enums"
import { ForbiddenError, HttpApi, HttpMethod } from "../../core/http"
import { userAuth } from "../../helpers/auth/userAuth"
import { listLawyer } from "../../services/lawyer/listLawyer"
import { updateOffering } from "../../services/offering/updateOffering"

const bodySchema = z
	.object({
		paperTypeId: z.number().int().optional(),
		languageId: z.number().int().optional(),
		description: z.string().max(1000).optional(),
		expectedTimeInHours: z.number().int().positive().optional(),
		price: z.number().positive().optional(),
		isAvailable: z.boolean().optional(),
	})
	.strict()

export const apiOfferingUpdate = new HttpApi({
	method: HttpMethod.PATCH,
	endpoint: "/offering/:id",
	bodySchema,
	paramsSchema: z.object({ id: z.string() }).strict(),
	handler: async ({ req, body, params }) => {
		const { id: userId } = userAuth(req, [AuthRole.LAWYER])
		const [lawyer] = await listLawyer({ filter: { userId } })
		if (!lawyer) throw new ForbiddenError("Invalid Lawyer")
		if (lawyer.isSuspended) throw new ForbiddenError("Lawyer is suspended")

		const id = +params.id
		return await updateOffering({ filter: { id }, update: body })
	},
})
