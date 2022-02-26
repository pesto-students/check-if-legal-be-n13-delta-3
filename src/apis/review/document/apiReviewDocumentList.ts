import { z } from "zod"
import * as Sentry from "@sentry/node"
import { AuthRole } from "../../../core/enums"
import { HttpApi, HttpMethod, UnprocessableEntityError } from "../../../core/http"
import { userAuth } from "../../../helpers/auth/userAuth"
import { getReviewDocsDirPath } from "../../../helpers/directoryPaths"
import { createDirIfNotExists, getDirFiles } from "../../../helpers/fs"
import { listReview } from "../../../services/review/listReview"
import { getUserOrLawyerFromAuth } from "../../../services/user/getUserOrLawyerFromAuth"

export const apiReviewDocumentList = new HttpApi({
	method: HttpMethod.GET,
	endpoint: "/review/:reviewId/document",
	paramsSchema: z.object({ reviewId: z.string() }).strict(),
	handler: async ({ req, params }) => {
		const authPayload = userAuth(req, [AuthRole.USER, AuthRole.LAWYER])
		const { userId, lawyerId } = await getUserOrLawyerFromAuth(authPayload)

		const reviewId = +params.reviewId
		const [review] = await listReview({ filter: { id: reviewId, userId, lawyerId } })
		if (!review) throw new UnprocessableEntityError("Review not found")

		const dirPath = getReviewDocsDirPath(review.id)
		await createDirIfNotExists(dirPath)
		return await getDirFiles(dirPath)
	},
})
