import { z } from "zod"
import { AuthRole } from "../../../core/enums"
import { ForbiddenError, HttpApi, HttpMethod } from "../../../core/http"
import { userAuth } from "../../../helpers/auth/userAuth"
import { listLawyer } from "../../../services/lawyer/listLawyer"
import { upsertLawyerBank } from "../../../services/lawyerBank/upsertLawyerBank"

const bodySchema = z
	.object({
		bankName: z.string().max(100),
		bankIfsc: z.string().max(11),
		accountNumber: z.string().max(30),
	})
	.strict()

export const apiLawyerBankUpsert = new HttpApi({
	method: HttpMethod.PUT,
	endpoint: "/lawyer/bank",
	bodySchema,
	handler: async ({ req, body }) => {
		const { id: userId } = userAuth(req, [AuthRole.LAWYER])

		const [lawyer] = await listLawyer({ filter: { userId } })
		if (!lawyer) throw new ForbiddenError("Invalid Lawyer")
		if (lawyer.isSuspended) throw new ForbiddenError("Lawyer is suspended")

		await upsertLawyerBank({ lawyerId: lawyer.id }, body)
	},
})
