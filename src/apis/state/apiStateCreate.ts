import { z } from "zod"
import { AuthRole } from "../../core/enums"
import { createdResponse, HttpApi, HttpMethod } from "../../core/http"
import { userAuth } from "../../helpers/auth/userAuth"
import { createState } from "../../services/state/createState"

const bodySchema = z.object({ name: z.string().max(100) }).strict()

export const apiStateCreate = new HttpApi({
	method: HttpMethod.POST,
	endpoint: "/state",
	bodySchema,
	handler: async ({ req, body }) => {
		userAuth(req, [AuthRole.ADMIN])
		const state = await createState(body)
		return createdResponse({ id: state.id })
	},
})
