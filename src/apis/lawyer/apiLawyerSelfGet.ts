import { AuthRole } from "../../core/enums"
import { HttpApi, HttpMethod, UnprocessableEntityError } from "../../core/http"
import { userAuth } from "../../helpers/auth/userAuth"
import { listLawyer } from "../../services/lawyer/listLawyer"
import { getUserOrLawyerFromAuth } from "../../services/user/getUserOrLawyerFromAuth"

export const apiLawyerSelfGet = new HttpApi({
	method: HttpMethod.GET,
	endpoint: "/lawyer/self",
	handler: async ({ req }) => {
		const authPayload = userAuth(req, [AuthRole.LAWYER])
		const { lawyerId } = await getUserOrLawyerFromAuth(authPayload)

		const [lawyer] = await listLawyer({
			filter: { id: lawyerId },
			include: { city: true },
		})
		if (!lawyer) throw new UnprocessableEntityError("Details not found")

		return lawyer
	},
})
