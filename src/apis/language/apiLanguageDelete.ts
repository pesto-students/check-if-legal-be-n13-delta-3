import { z } from "zod"
import { AuthRole } from "../../core/enums"
import { HttpApi, HttpMethod } from "../../core/http"
import { userAuth } from "../../helpers/auth/userAuth"
import { deleteLanguage } from "../../services/language/deleteLanguage"

export const apiLanguageDelete = new HttpApi({
	method: HttpMethod.DELETE,
	endpoint: "/language/:id",
	paramsSchema: z.object({ id: z.string() }).strict(),
	handler: async ({ req, params }) => {
		userAuth(req, [AuthRole.ADMIN])
		await deleteLanguage({ id: +params.id })
	},
})
