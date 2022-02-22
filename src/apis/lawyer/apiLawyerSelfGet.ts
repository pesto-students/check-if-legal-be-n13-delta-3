import { AuthRole } from "../../core/enums"
import { HttpApi, HttpMethod } from "../../core/http"
import { userAuth } from "../../helpers/auth/userAuth"
import { listLawyer } from "../../services/lawyer/listLawyer"

export const apiLawyerSelfGet = new HttpApi({
	method: HttpMethod.GET,
	endpoint: "/lawyer/self",
	handler: async ({ req }) => {
		const { id: userId } = userAuth(req, [AuthRole.LAWYER])

		const [lawyer] = await listLawyer({ filter: { userId }, include: { city: true } })
		return lawyer ?? null
	},
})
