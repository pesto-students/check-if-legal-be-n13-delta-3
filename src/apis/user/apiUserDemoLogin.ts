import { z } from "zod"
import configs from "../../core/configs"
import { AuthRole } from "../../core/enums"
import { HttpApi, HttpMethod } from "../../core/http"
import { createAuthToken } from "../../helpers/auth/authToken"
import { listLawyer } from "../../services/lawyer/listLawyer"
import { getOrCreateUserWithGoogleOAuth } from "../../services/user/getOrCreateUserWithGoogleOAuth"

export const apiUserDemoLogin = new HttpApi({
	method: HttpMethod.POST,
	endpoint: "/user/demo/login",
	bodySchema: z.object({ isLawyer: z.boolean().optional() }).strict(),
	handler: async ({ body: { isLawyer } }) => {
		const googleUserId = isLawyer ? configs.demo.lawyerId : configs.demo.userId
		const email = isLawyer
			? "demo_lawyer@checkiflegal.com"
			: "demo_user@checkiflegal.com"
		const name = isLawyer ? "Demo Lawyer" : "Demo User"

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
