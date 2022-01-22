import { userAuth } from "../../core/auth"
import { AuthRole } from "../../core/enums"
import { HttpApi, HttpMethod } from "../../core/http"
import { listOffering } from "../../services/offering/listOffering"

export const apiUserOfferingList = new HttpApi({
	method: HttpMethod.POST,
	endpoint: "/user/offering/list",
	handler: async (req) => {
		userAuth(req, [AuthRole.USER])
		const body = req.body as {
			paperTypeId: number
			cityId: number
			languageId: number
			maxPrice?: number
		}

		const offerings = await listOffering({
			filter: { ...body, isActive: true },
			include: { lawyer: true },
		})
		return offerings
	},
})
