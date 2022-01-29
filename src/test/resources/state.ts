import { randState } from "@ngneat/falso"
import { createState } from "../../services/state/createState"

export async function generateState() {
	const name = randState()
	return await createState({ name })
}
