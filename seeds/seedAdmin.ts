import { createAdmin } from "../src/services/admin/createAdmin"

export async function seedAdmin() {
	const username = "admin"
	const password = "admin"

	await createAdmin({ username, password })
}
