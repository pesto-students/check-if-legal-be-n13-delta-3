import { z } from "zod"
import { AuthRole } from "../../core/enums"
import { HttpApi, HttpMethod } from "../../core/http"
import { userAuth } from "../../helpers/auth/userAuth"
import { listLawyer } from "../../services/lawyer/listLawyer"

const bodySchema = z
	.object({
		isSuspended: z.boolean().optional(),
		isVerified: z.boolean().optional(),
		limit: z.number().positive().optional().default(10),
		pageNo: z.number().positive().optional().default(1),
	})
	.strict()

export const apiLawyerList = new HttpApi({
	method: HttpMethod.GET,
	endpoint: "/lawyer",
	bodySchema,
	handler: async ({ req, body }) => {
		userAuth(req, [AuthRole.ADMIN])

		const { isSuspended, isVerified, limit, pageNo } = body
		return await listLawyer({
			filter: { isVerified, isSuspended },
			pagination: { limit, pageNo },
			include: { city: true },
		})
	},
})
