import { AuthRole } from "../../core/enums"
import { HttpApi, HttpMethod } from "../../core/http"
import { userAuth } from "../../helpers/auth/userAuth"
import { getReviewRatingCount } from "../../services/reviewRating/getReviewRatingCount"
import { getUserOrLawyerFromAuth } from "../../services/user/getUserOrLawyerFromAuth"

export const apiRatingListCountGet = new HttpApi({
	method: HttpMethod.GET,
	endpoint: "/rating/count",
	handler: async ({ req }) => {
		const auth = userAuth(req, [AuthRole.USER, AuthRole.LAWYER])
		const { userId, lawyerId } = await getUserOrLawyerFromAuth(auth)

		return await getReviewRatingCount({ filter: { userId, lawyerId } })
	},
})
