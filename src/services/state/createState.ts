import { PrismaClient, State } from "@prisma/client"
import { checkStateNameAvailability } from "./checkStateNameAvailability"

export async function createState({ name }: { name: string }): Promise<State> {
	const prisma = new PrismaClient()
	await checkStateNameAvailability(name)
	return await prisma.state.create({ data: { name } })
}
