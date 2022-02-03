import { z } from "zod"
import { AuthRole } from "../../core/enums"
import { HttpApi, HttpMethod } from "../../core/http"
import { userAuth } from "../../helpers/auth/userAuth"
import { updateState } from "../../services/state/updateState"

const bodySchema = z.object({ name: z.string().max(100) }).strict()

export const apiStateUpdate = new HttpApi({
	method: HttpMethod.PATCH,
	endpoint: "/state/:id",
	bodySchema,
	paramsSchema: z.object({ id: z.string() }).strict(),
	handler: async ({ req, body, params }) => {
		userAuth(req, [AuthRole.ADMIN])
		const id = +params.id
		await updateState({ filter: { id }, update: body })
	},
})
