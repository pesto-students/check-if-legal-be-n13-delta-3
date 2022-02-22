import { AuthRole } from "../../../core/enums"
import { ForbiddenError, HttpApi, HttpMethod } from "../../../core/http"
import { userAuth } from "../../../helpers/auth/userAuth"
import { listLawyer } from "../../../services/lawyer/listLawyer"
import { deleteLawyerBank } from "../../../services/lawyerBank/deleteLawyerBank"

export const apiLawyerBankDelete = new HttpApi({
	method: HttpMethod.DELETE,
	endpoint: "/lawyer/bank",
	handler: async ({ req }) => {
		const { id: userId } = userAuth(req, [AuthRole.LAWYER])

		const [lawyer] = await listLawyer({ filter: { userId } })
		if (!lawyer) throw new ForbiddenError("Invalid Lawyer")
		if (lawyer.isSuspended) throw new ForbiddenError("Lawyer is suspended")

		await deleteLawyerBank({ lawyerId: lawyer.id })
	},
})
