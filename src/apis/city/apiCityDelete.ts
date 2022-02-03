import { z } from "zod"
import { AuthRole } from "../../core/enums"
import { HttpApi, HttpMethod } from "../../core/http"
import { userAuth } from "../../helpers/auth/userAuth"
import { deleteCity } from "../../services/city/deleteCity"

export const apiCityDelete = new HttpApi({
	method: HttpMethod.DELETE,
	endpoint: "/city/:id",
	paramsSchema: z.object({ id: z.string() }).strict(),
	handler: async ({ req, params }) => {
		userAuth(req, [AuthRole.ADMIN])
		await deleteCity({ id: +params.id })
	},
})
