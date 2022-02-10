import { z } from "zod"
import { AuthRole } from "../../core/enums"
import { HttpApi, HttpMethod } from "../../core/http"
import { userAuth } from "../../helpers/auth/userAuth"
import { deletePaperType } from "../../services/paperType/deletePaperType"

export const apiPaperTypeDelete = new HttpApi({
	method: HttpMethod.DELETE,
	endpoint: "/paperType/:id",
	paramsSchema: z.object({ id: z.string() }).strict(),
	handler: async ({ req, params }) => {
		userAuth(req, [AuthRole.ADMIN])
		await deletePaperType({ id: +params.id })
	},
})
