import { randPassword, randUserName } from "@ngneat/falso"
import { checkAdminUsernameAvailability } from "../../services/admin/checkAdminUsernameAvailability"
import { createAdmin } from "../../services/admin/createAdmin"

export async function generateAdmin() {
	const username = await getAvailableAdminUsername()
	const password = randPassword({ size: 3 })

	const created = await createAdmin({ username, password })
	return { ...created, password }
}

export async function getAvailableAdminUsername() {
	let username = randUserName()
	do {
		try {
			username = username.substring(0, 20)
			await checkAdminUsernameAvailability(username)
			return username
		} catch (err) {
			if (err instanceof Error && err.name == "ConflictError") {
				username = randUserName()
				continue
			}
			throw err
		}
	} while (true)
}
