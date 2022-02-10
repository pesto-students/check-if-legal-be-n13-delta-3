import { z } from "zod"
import { AuthRole } from "../../core/enums"
import { createdResponse, HttpApi, HttpMethod } from "../../core/http"
import { userAuth } from "../../helpers/auth/userAuth"
import { createCity } from "../../services/city/createCity"

const bodySchema = z.object({ name: z.string().max(100), stateId: z.number() }).strict()

export const apiCityCreate = new HttpApi({
	method: HttpMethod.POST,
	endpoint: "/city",
	bodySchema,
	handler: async ({ req, body }) => {
		userAuth(req, [AuthRole.ADMIN])
		const city = await createCity(body)
		return createdResponse({ id: city.id })
	},
})
