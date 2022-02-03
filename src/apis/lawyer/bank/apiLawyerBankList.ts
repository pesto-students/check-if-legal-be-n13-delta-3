import { z } from "zod"
import { AuthRole } from "../../../core/enums"
import { ForbiddenError, HttpApi, HttpMethod } from "../../../core/http"
import { userAuth } from "../../../helpers/auth/userAuth"
import { listLawyer } from "../../../services/lawyer/listLawyer"
import { listLawyerBank } from "../../../services/lawyerBank/listLawyerBank"

const bodySchema = z
	.object({
		limit: z.number().positive().optional().default(10),
		pageNo: z.number().positive().optional().default(1),
	})
	.strict()

export const apiLawyerBankList = new HttpApi({
	method: HttpMethod.GET,
	endpoint: "/lawyer/bank",
	bodySchema,
	handler: async ({ req, body }) => {
		const { id: userId } = userAuth(req, [AuthRole.LAWYER])
		const [lawyer] = await listLawyer({ filter: { userId } })
		if (!lawyer) throw new ForbiddenError("Invalid Lawyer")
		if (lawyer.isSuspended) throw new ForbiddenError("Lawyer is suspended")

		return await listLawyerBank({ filter: { lawyerId: lawyer.id }, pagination: body })
	},
})
