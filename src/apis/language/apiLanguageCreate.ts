import { z } from "zod"
import { AuthRole } from "../../core/enums"
import { createdResponse, HttpApi, HttpMethod } from "../../core/http"
import { userAuth } from "../../helpers/auth/userAuth"
import { createLanguage } from "../../services/language/createLanguage"

const bodySchema = z.object({ name: z.string().max(100) }).strict()

export const apiLanguageCreate = new HttpApi({
	method: HttpMethod.POST,
	endpoint: "/language",
	bodySchema,
	handler: async ({ req, body }) => {
		userAuth(req, [AuthRole.ADMIN])
		const language = await createLanguage(body)
		return createdResponse({ id: language.id })
	},
})
