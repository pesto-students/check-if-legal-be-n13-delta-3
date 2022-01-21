import { randPassword, randUserName } from "@ngneat/falso"
import { checkAdminUsernameAvailability } from "../../../services/admin/checkAdminUsernameAvailability"
import { createAdmin } from "../../../services/admin/createAdmin"

export async function generateAdmin() {
	const username = await generateUniqueUsernameForAdmin()
	const password = randPassword()

	const created = await createAdmin({ username, password })
	return { ...created, password }
}

export async function generateUniqueUsernameForAdmin() {
	let username = randUserName()
	do {
		try {
			await checkAdminUsernameAvailability(username)
		} catch (err) {
			username = randUserName()
			continue
		}
	} while (false)
	return username
}
