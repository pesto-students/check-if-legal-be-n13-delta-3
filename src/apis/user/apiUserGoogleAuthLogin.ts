import { z } from "zod"
import { AuthRole } from "../../core/enums"
import { verifyGoogleOAuthIdToken } from "../../helpers/googleOAuth/verifyGoogleOAuthIdToken"
import { HttpApi, HttpMethod } from "../../core/http"
import { getOrCreateUserWithGoogleOAuth } from "../../services/user/getOrCreateUserWithGoogleOAuth"
import { createAuthToken } from "../../helpers/auth/authToken"

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

		const role = user.isLawyer ? AuthRole.LAWYER : AuthRole.USER
		const token = createAuthToken({ role, id: user.id })
		return { role, token }
	},
})
