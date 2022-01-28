import { z } from "zod"
import { userAuth } from "../../core/auth"
import { AuthRole } from "../../core/enums"
import { HttpApi, HttpMethod } from "../../core/http"
import { updateReview } from "../../services/review/updateReview"
import { getUserOrLawyerFromAuth } from "../../services/user/getUserOrLawyerFromAuth"

const bodySchema = z
	.object({
		filter: z.object({ id: z.number().int() }),
		update: z.object({ userNote: z.string().nullable() }),
	})
	.strict()

export const apiReviewNoteUpdate = new HttpApi({
	method: HttpMethod.POST,
	endpoint: "/review/note/update",
	bodySchema,
	handler: async ({ req, body: { filter, update } }) => {
		const authPayload = userAuth(req, [AuthRole.USER, AuthRole.LAWYER])
		const { userId, lawyerId } = await getUserOrLawyerFromAuth(authPayload)

		await updateReview({
			filter: { ...filter, userId, lawyerId },
			update,
		})
	},
})
