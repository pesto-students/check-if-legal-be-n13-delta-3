import { z } from "zod"
import { userAuth } from "../../core/auth"
import { AuthRole } from "../../core/enums"
import { HttpApi, HttpMethod } from "../../core/http"
import { parseSchema } from "../../core/parseSchema"
import { listOffering } from "../../services/offering/listOffering"

export const apiUserOfferingList = new HttpApi({
	method: HttpMethod.POST,
	endpoint: "/user/offering/list",
	handler: async (req) => {
		userAuth(req, [AuthRole.USER])
		const bodySchema = z
			.object({
				paperTypeId: z.number().int(),
				cityId: z.number().int(),
				languageId: z.number().int(),
				maxPrice: z.number().int().optional(),
			})
			.strict()
		const body = await parseSchema(bodySchema, req.body)

		const offerings = await listOffering({
			filter: { ...body, isActive: true },
			include: { lawyer: true },
		})
		return offerings
	},
})
