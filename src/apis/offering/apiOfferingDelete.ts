import { z } from "zod"
import { AuthRole } from "../../core/enums"
import {
	ForbiddenError,
	HttpApi,
	HttpMethod,
	UnprocessableEntityError,
} from "../../core/http"
import { userAuth } from "../../helpers/auth/userAuth"
import { listLawyer } from "../../services/lawyer/listLawyer"
import { deleteOffering } from "../../services/offering/deleteOffering"
import { listOffering } from "../../services/offering/listOffering"

export const apiOfferingDelete = new HttpApi({
	method: HttpMethod.DELETE,
	endpoint: "/offering/:id",
	paramsSchema: z.object({ id: z.string() }).strict(),
	handler: async ({ req, params }) => {
		const { id: userId } = userAuth(req, [AuthRole.LAWYER])
		const [lawyer] = await listLawyer({ filter: { userId } })
		if (!lawyer) throw new ForbiddenError("Invalid Lawyer")
		if (lawyer.isSuspended) throw new ForbiddenError("Lawyer is suspended")

		const id = +params.id

		const [offering] = await listOffering({ filter: { id, lawyerId: lawyer.id } })
		if (!offering) throw new UnprocessableEntityError("Invalid Offering")

		await deleteOffering({ id })
	},
})
