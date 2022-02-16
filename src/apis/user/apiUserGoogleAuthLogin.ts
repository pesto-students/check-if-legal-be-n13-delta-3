import { z } from "zod"
import { AuthRole } from "../../core/enums"
import { HttpApi, HttpMethod } from "../../core/http"
import { createAuthToken } from "../../helpers/auth/authToken"
import { verifyGoogleOAuthIdToken } from "../../helpers/googleOAuth/verifyGoogleOAuthIdToken"
import { listLawyer } from "../../services/lawyer/listLawyer"
import { getOrCreateUserWithGoogleOAuth } from "../../services/user/getOrCreateUserWithGoogleOAuth"

const bodySchema = z
	.object({ idToken: z.string(), isLawyer: z.boolean().optional() })
	.strict()

export const apiUserGoogleAuthLogin = new HttpApi({
	method: HttpMethod.POST,
	endpoint: "/user/googleAuth",
	bodySchema,
	handler: async ({ body: { idToken, isLawyer } }) => {
		const { email, googleUserId, name } = await verifyGoogleOAuthIdToken(idToken)

		const user = await getOrCreateUserWithGoogleOAuth({
			googleUserId,
			name,
			email,
			isLawyer,
		})

		let isVerified = true
		const role = user.isLawyer ? AuthRole.LAWYER : AuthRole.USER

		const [lawyer] = await listLawyer({ filter: { userId: user.id } })
		if (!lawyer) isVerified = false
		if (lawyer && !lawyer.isVerified) isVerified = false

		const token = createAuthToken({ role, id: user.id })
		return { role, token, isVerified }
	},
})
