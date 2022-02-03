import { z } from "zod"
import { AuthRole } from "../../core/enums"
import { HttpApi, HttpMethod } from "../../core/http"
import { userAuth } from "../../helpers/auth/userAuth"
import { updateLanguage } from "../../services/language/updateLanguage"

export const apiLanguageUpdate = new HttpApi({
	method: HttpMethod.PATCH,
	endpoint: "/language/:id",
	bodySchema: z.object({ name: z.string().max(100).optional() }).strict(),
	paramsSchema: z.object({ id: z.string() }).strict(),
	handler: async ({ req, body, params }) => {
		userAuth(req, [AuthRole.ADMIN])
		const id = +params.id
		await updateLanguage({ filter: { id }, update: body })
	},
})
