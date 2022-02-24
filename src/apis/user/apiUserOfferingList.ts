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
		pageNo: z.string().optional(),
		limit: z.string().optional(),
	})
	.strict()

export const apiUserOfferingList = new HttpApi({
	method: HttpMethod.GET,
	endpoint: "/user/offering",
	querySchema,
	handler: async ({ req, query }) => {
		const authPayload = userPublicAuth(req, [AuthRole.USER])
		const isGuestUser = !authPayload

		const cityId = +query.cityId
		const languageId = +query.languageId
		const paperTypeId = +query.paperTypeId
		const maxPrice = query.maxPrice ? +query.maxPrice : undefined
		const pageNo = query.pageNo ? +query.pageNo : undefined
		const limit = query.limit ? +query.limit : undefined

		const offerings = await listOffering({
			filter: {
				cityId,
				languageId,
				paperTypeId,
				maxPrice,
				isAvailable: true,
				isLawyerAvailable: true,
			},
			pagination: { pageNo, limit },
			include: { lawyer: true },
		})
		return offerings.map((el) => sanitizeOffering(el, isGuestUser))
	},
})
