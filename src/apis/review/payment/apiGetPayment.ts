import { AuthRole } from "../../../core/enums"
import { HttpApi, HttpMethod } from "../../../core/http"
import { userAuth } from "../../../helpers/auth/userAuth"
import { listReview } from "../../../services/review/listReview"
import { getAllReviewPayments } from "../../../services/reviewPayment/reviewIdList"
import { getUserOrLawyerFromAuth } from "../../../services/user/getUserOrLawyerFromAuth"

export const apiListPayments = new HttpApi({
	method: HttpMethod.GET,
	endpoint: "/list/payments",
	handler: async ({ req }) => {
		const authPayload = userAuth(req, [AuthRole.USER, AuthRole.LAWYER])
		const { userId, lawyerId } = await getUserOrLawyerFromAuth(authPayload)
		const data = await listReview({
			filter: { userId: userId, lawyerId: lawyerId },
		})
		if (!data) return []
		const reviewIds = data.map((ins: any) => ins.id)
		const details = await getAllReviewPayments({ reviewIds })
		return details
	},
})
