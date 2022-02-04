import { z } from "zod"
import { AuthRole } from "../../core/enums"
import { HttpApi, HttpMethod, UnprocessableEntityError } from "../../core/http"
import { userAuth } from "../../helpers/auth/userAuth"
import { deleteReview } from "../../services/review/deleteReview"
import { listReview } from "../../services/review/listReview"

export const apiReviewCancel = new HttpApi({
	method: HttpMethod.DELETE,
	endpoint: "/review/:id",
	paramsSchema: z.object({ id: z.string() }).strict(),
	handler: async ({ req, params }) => {
		const { id: userId } = userAuth(req, [AuthRole.USER])

		const id = +params.id
		const [review] = await listReview({ filter: { id, userId } })
		if (!review) throw new UnprocessableEntityError("Invalid Review")

		await deleteReview({ id })
	},
})
