import { State } from "@prisma/client"
import _ from "lodash"
import { prisma } from "../../core/prisma"

export async function listState({
	filter: { id } = {},
}: {
	filter?: { id?: number }
} = {}): Promise<State[]> {
	return await prisma.state.findMany({ where: { ...(id && { id }) } })
}
