import { z } from "zod"
import { AuthRole } from "../../core/enums"
import { createdResponse, HttpApi, HttpMethod } from "../../core/http"
import { userAuth } from "../../helpers/auth/userAuth"
import { createPaperType } from "../../services/paperType/createPaperType"

const bodySchema = z.object({ name: z.string().max(100) }).strict()

export const apiPaperTypeCreate = new HttpApi({
	method: HttpMethod.POST,
	endpoint: "/paperType",
	bodySchema,
	handler: async ({ req, body }) => {
		userAuth(req, [AuthRole.ADMIN])
		const paperType = await createPaperType(body)
		return createdResponse({ id: paperType.id })
	},
})
