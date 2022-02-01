import { z } from "zod"
import { AuthRole } from "../../../core/enums"
import {
	ForbiddenError,
	HttpApi,
	HttpMethod,
	UnprocessableEntityError,
} from "../../../core/http"
import { userAuth } from "../../../helpers/auth/userAuth"
import { listLawyer } from "../../../services/lawyer/listLawyer"
import { deleteLawyerBank } from "../../../services/lawyerBank/deleteLawyerBank"
import { listLawyerBank } from "../../../services/lawyerBank/listLawyerBank"

export const apiLawyerBankDelete = new HttpApi({
	method: HttpMethod.DELETE,
	endpoint: "/lawyer/bank/:id",
	paramsSchema: z.object({ id: z.string() }).strict(),
	handler: async ({ req, params }) => {
		const { id: userId } = userAuth(req, [AuthRole.LAWYER])
		const [lawyer] = await listLawyer({ filter: { userId } })
		if (!lawyer) throw new ForbiddenError("Invalid Lawyer")
		if (lawyer.isSuspended) throw new ForbiddenError("Lawyer is suspended")

		const id = +params.id
		const [lawyerBank] = await listLawyerBank({ filter: { id, lawyerId: lawyer.id } })
		if (!lawyerBank) throw new UnprocessableEntityError("Invalid Lawyer Bank")

		await deleteLawyerBank({ id })
	},
})
