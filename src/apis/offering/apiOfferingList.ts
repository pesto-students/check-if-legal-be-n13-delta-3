import { z } from "zod"
import { AuthRole } from "../../core/enums"
import { ForbiddenError, HttpApi, HttpMethod } from "../../core/http"
import { userAuth } from "../../helpers/auth/userAuth"
import { listLawyer } from "../../services/lawyer/listLawyer"
import { listOffering } from "../../services/offering/listOffering"

const bodySchema = z
	.object({
		limit: z.number().int().optional().default(10),
		pageNo: z.number().int().optional().default(1),
	})
	.strict()

export const apiOfferingList = new HttpApi({
	method: HttpMethod.GET,
	endpoint: "/offering",
	bodySchema,
	handler: async ({ req, body }) => {
		const { id: userId } = userAuth(req, [AuthRole.LAWYER])
		const [lawyer] = await listLawyer({ filter: { userId } })
		if (lawyer.isSuspended) throw new ForbiddenError("Lawyer is suspended")

		return await listOffering({
			filter: { lawyerId: lawyer.id },
			pagination: body,
			include: { paperType: true, language: true },
		})
	},
})
