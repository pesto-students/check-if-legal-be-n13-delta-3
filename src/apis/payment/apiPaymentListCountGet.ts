import { AuthRole } from "../../core/enums"
import { HttpApi, HttpMethod } from "../../core/http"
import { userAuth } from "../../helpers/auth/userAuth"
import { getReviewPaymentCount } from "../../services/reviewPayment/getReviewPaymentCount"

export const apiPaymentListCountGet = new HttpApi({
	method: HttpMethod.GET,
	endpoint: "/payment/count",
	handler: async ({ req }) => {
		const { id: userId } = userAuth(req, [AuthRole.USER])
		return await getReviewPaymentCount({ filter: { userId } })
	},
})
