import { z } from "zod"
import { AuthRole } from "../../core/enums"
import { HttpApi, HttpMethod } from "../../core/http"
import { userAuth } from "../../helpers/auth/userAuth"
import { updateCity } from "../../services/city/updateCity"

const bodySchema = z.object({ name: z.string().max(100).optional() }).strict()

export const apiCityUpdate = new HttpApi({
	method: HttpMethod.PATCH,
	endpoint: "/city/:id",
	bodySchema,
	paramsSchema: z.object({ id: z.string() }).strict(),
	handler: async ({ req, body, params }) => {
		userAuth(req, [AuthRole.ADMIN])
		const id = +params.id
		await updateCity({ filter: { id }, update: body })
	},
})
