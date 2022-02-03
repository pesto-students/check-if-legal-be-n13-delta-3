import { ConflictError } from "../../core/http"
import { prisma } from "../../core/prisma"

export async function checkStateNameAvailability(name: string) {
	const state = await prisma.state.findFirst({
		where: { name: { equals: name.toLowerCase(), mode: "insensitive" } },
	})
	if (!state) return
	throw new ConflictError(`State with name ${name} already exists`)
}
