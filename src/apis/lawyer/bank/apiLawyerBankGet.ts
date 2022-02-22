import { AuthRole } from "../../../core/enums"
import { ForbiddenError, HttpApi, HttpMethod } from "../../../core/http"
import { userAuth } from "../../../helpers/auth/userAuth"
import { listLawyer } from "../../../services/lawyer/listLawyer"
import { getLawyerBank } from "../../../services/lawyerBank/getLawyerBank"

export const apiLawyerBankGet = new HttpApi({
	method: HttpMethod.GET,
	endpoint: "/lawyer/bank",
	handler: async ({ req }) => {
		const { id: userId } = userAuth(req, [AuthRole.LAWYER])
		const [lawyer] = await listLawyer({ filter: { userId } })
		if (!lawyer) throw new ForbiddenError("Invalid Lawyer")
		if (lawyer.isSuspended) throw new ForbiddenError("Lawyer is suspended")

		return await getLawyerBank({ lawyerId: lawyer.id })
	},
})
