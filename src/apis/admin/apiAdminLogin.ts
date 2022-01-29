import { z } from "zod"
import { AuthRole } from "../../core/enums"
import { verifyHash } from "../../helpers/hash"
import { HttpApi, HttpMethod, UnprocessableEntityError } from "../../core/http"
import { listAdmin } from "../../services/admin/listAdmin"
import { createAuthToken } from "../../helpers/auth/authToken"

export const apiAdminLogin = new HttpApi({
	method: HttpMethod.POST,
	endpoint: "/admin/login",
	bodySchema: z.object({ username: z.string(), password: z.string() }).strict(),
	handler: async ({ body: { username, password } }) => {
		const invalidCredentialsError = new UnprocessableEntityError(
			"Invalid username or password",
		)

		const [admin] = await listAdmin({ filter: { username } })
		if (!admin) throw invalidCredentialsError

		const isPasswordValid = await verifyHash(password, admin.hashedPassword)
		if (!isPasswordValid) throw invalidCredentialsError

		const token = createAuthToken({ role: AuthRole.ADMIN, id: admin.id })
		return { token }
	},
})
