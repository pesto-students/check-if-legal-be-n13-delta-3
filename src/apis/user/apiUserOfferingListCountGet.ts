import { z } from "zod"
import { HttpApi, HttpMethod } from "../../core/http"
import { getOfferingCount } from "../../services/offering/getOfferingCount"

const querySchema = z
	.object({
		paperTypeId: z.string(),
		cityId: z.string(),
		languageId: z.string(),
		maxPrice: z.string().optional(),
	})
	.strict()

export const apiUserOfferingListCountGet = new HttpApi({
	method: HttpMethod.GET,
	endpoint: "/user/offering/count",
	querySchema,
	handler: async ({ query }) => {
		const { cityId, languageId, paperTypeId, maxPrice } = query
		return await getOfferingCount({
			filter: {
				cityId: +cityId,
				languageId: +languageId,
				paperTypeId: +paperTypeId,
				maxPrice: maxPrice ? +maxPrice : undefined,
				isAvailable: true,
				isLawyerAvailable: true,
			},
		})
	},
})
