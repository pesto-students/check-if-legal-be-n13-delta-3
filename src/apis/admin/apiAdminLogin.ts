import { createAuthToken } from "../../core/auth"
import { AuthRole } from "../../core/enums"
import { verifyHash } from "../../core/helpers/hash"
import { HttpApi, HttpMethod, UnprocessableEntityError } from "../../core/http"
import { listAdmin } from "../../services/admin/listAdmin"
import { z } from "zod"
import { parseSchema } from "../../core/parseSchema"

export const apiAdminLogin = new HttpApi({
	method: HttpMethod.POST,
	endpoint: "/admin/login",
	handler: async (req) => {
		const bodySchema = z
			.object({
				username: z.string(),
				password: z.string(),
			})
			.strict()
		const { username, password } = await parseSchema(bodySchema, req.body)

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
