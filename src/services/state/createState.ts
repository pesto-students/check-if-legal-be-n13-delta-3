import { State } from "@prisma/client"
import { prisma } from "../../core/prisma"
import { checkStateNameAvailability } from "./checkStateNameAvailability"

export async function createState({ name }: { name: string }): Promise<State> {
	await checkStateNameAvailability(name)
	return await prisma.state.create({ data: { name } })
}
