import { z } from "zod"
import { AuthRole } from "../../core/enums"
import { HttpApi, HttpMethod } from "../../core/http"
import { userPublicAuth } from "../../helpers/auth/userPublicAuth"
import { listOffering } from "../../services/offering/listOffering"
import { sanitizeOffering } from "../../services/offering/sanitizeOffering"

const querySchema = z
	.object({
		paperTypeId: z.string(),
		cityId: z.string(),
		languageId: z.string(),
		maxPrice: z.string().optional(),
	})
	.strict()

export const apiUserOfferingList = new HttpApi({
	method: HttpMethod.GET,
	endpoint: "/user/offering",
	querySchema,
	handler: async ({ req, query }) => {
		const authPayload = userPublicAuth(req, [AuthRole.USER])
		const isGuestUser = !authPayload

		const { cityId, languageId, paperTypeId, maxPrice } = query

		const offerings = await listOffering({
			filter: {
				cityId: +cityId,
				languageId: +languageId,
				paperTypeId: +paperTypeId,
				maxPrice: maxPrice ? +maxPrice : undefined,
				isAvailable: true,
				isLawyerAvailable: true,
			},
			include: { lawyer: true },
		})
		return offerings.map((el) => sanitizeOffering(el, isGuestUser))
	},
})
