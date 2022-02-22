import { ReviewStatus } from "@prisma/client"
import { z } from "zod"
import { AuthRole } from "../../core/enums"
import {
	ConflictError,
	ForbiddenError,
	HttpApi,
	HttpMethod,
	UnprocessableEntityError,
} from "../../core/http"
import { userAuth } from "../../helpers/auth/userAuth"
import { listLawyer } from "../../services/lawyer/listLawyer"
import { listReview } from "../../services/review/listReview"
import { updateReview } from "../../services/review/updateReview"

export const apiReviewClose = new HttpApi({
	method: HttpMethod.POST,
	endpoint: "/review/:id/close",
	paramsSchema: z.object({ id: z.string() }).strict(),
	handler: async ({ req, params }) => {
		const { id: userId } = userAuth(req, [AuthRole.LAWYER])
		const [lawyer] = await listLawyer({ filter: { userId } })
		if (!lawyer) throw new ForbiddenError("Invalid Lawyer")
		if (lawyer.isSuspended) throw new ForbiddenError("Lawyer is suspended")

		const [review] = await listReview({ filter: { lawyerId: lawyer.id } })
		if (!review) throw new UnprocessableEntityError("Invalid Review")
		if (review.status === ReviewStatus.CLOSED) {
			throw new ConflictError("Review already closed")
		}
		if (review.status !== ReviewStatus.PENDING_FOR_REVIEW) {
			throw new ConflictError("Only pending reviews are allowed to close")
		}

		const id = +params.id
		await updateReview({ filter: { id }, update: { status: ReviewStatus.CLOSED } })
	},
})
