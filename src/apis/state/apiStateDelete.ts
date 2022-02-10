import { z } from "zod"
import { AuthRole } from "../../core/enums"
import { HttpApi, HttpMethod } from "../../core/http"
import { userAuth } from "../../helpers/auth/userAuth"
import { deleteState } from "../../services/state/deleteState"

export const apiStateDelete = new HttpApi({
	method: HttpMethod.DELETE,
	endpoint: "/state/:id",
	paramsSchema: z.object({ id: z.string() }).strict(),
	handler: async ({ req, params }) => {
		userAuth(req, [AuthRole.ADMIN])
		await deleteState({ id: +params.id })
	},
})
