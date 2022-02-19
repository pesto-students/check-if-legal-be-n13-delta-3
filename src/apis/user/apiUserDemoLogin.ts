import { z } from "zod"
import { HttpApi, HttpMethod, UnprocessableEntityError } from "../../core/http"

export const apiUserDemoLogin = new HttpApi({
	method: HttpMethod.POST,
	endpoint: "/user/demo/login",
	bodySchema: z.object({ isLawyer: z.boolean().optional() }).strict(),
	handler: async ({ body: {} }) => {
		throw new UnprocessableEntityError("Login as demo user is temporary disabled")
	},
})
