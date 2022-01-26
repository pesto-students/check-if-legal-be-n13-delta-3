import { PrismaClient } from "@prisma/client"
import { UnprocessableEntityError } from "../../core/http"

export async function checkStateNameAvailability(name: string) {
	const prisma = new PrismaClient()
	const state = await prisma.state.findFirst({
		where: { name: { equals: name.toLowerCase(), mode: "insensitive" } },
	})
	if (!state) return
	throw new UnprocessableEntityError(`State with name ${name} already exists`)
}
