import { z } from "zod"
import { AuthRole } from "../../core/enums"
import { HttpApi, HttpMethod } from "../../core/http"
import { userAuth } from "../../helpers/auth/userAuth"
import { updateReview } from "../../services/review/updateReview"

const bodySchema = z.object({ userNote: z.string().nullable() }).strict()

export const apiReviewNoteUpdate = new HttpApi({
	method: HttpMethod.PATCH,
	endpoint: "/review/:id",
	bodySchema,
	paramsSchema: z.object({ id: z.string() }).strict(),
	handler: async ({ req, body, params }) => {
		const { id: userId } = userAuth(req, [AuthRole.USER])
		const id = +params.id

		await updateReview({ filter: { id, userId }, update: body })
	},
})
