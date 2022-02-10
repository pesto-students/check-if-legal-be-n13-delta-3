import { z } from "zod"
import { AuthRole } from "../../core/enums"
import { createdResponse, HttpApi, HttpMethod } from "../../core/http"
import { userAuth } from "../../helpers/auth/userAuth"
import { createLawyer } from "../../services/lawyer/createLawyer"

const bodySchema = z
	.object({
		name: z.string().max(100),
		cityId: z.number(),
		address: z.string().max(400),
		description: z.string().max(400),
		phone: z.string().max(20),
	})
	.strict()

export const apiLawyerRegistration = new HttpApi({
	method: HttpMethod.POST,
	endpoint: "/lawyer/register",
	bodySchema,
	handler: async ({ req, body }) => {
		const { id: userId } = userAuth(req, [AuthRole.LAWYER])
		const lawyer = await createLawyer({ ...body, userId })
		return createdResponse({ id: lawyer.id })
	},
})
