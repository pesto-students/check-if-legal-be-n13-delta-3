import { z } from "zod"
import { userAuth } from "../../core/auth"
import { AuthRole } from "../../core/enums"
import { HttpApi, HttpMethod } from "../../core/http"
import { listOffering } from "../../services/offering/listOffering"

const bodySchema = z
	.object({
		paperTypeId: z.number().int(),
		cityId: z.number().int(),
		languageId: z.number().int(),
		maxPrice: z.number().int().optional(),
	})
	.strict()

export const apiUserOfferingList = new HttpApi({
	method: HttpMethod.GET,
	endpoint: "/user/offering",
	bodySchema,
	handler: async ({ req, body }) => {
		userAuth(req, [AuthRole.USER])

		const offerings = await listOffering({
			filter: { ...body, isAvailable: true, isLawyerAvailable: true },
			include: { lawyer: true },
		})

		return offerings
	},
})
