import { State } from "@prisma/client"
import _ from "lodash"
import { prisma } from "../../core/prisma"

export async function listState({
	filter: { id } = {},
	pagination: { limit = 10, pageNo = 1 } = {},
}: {
	filter?: { id?: number }
	pagination?: { limit?: number; pageNo?: number }
} = {}): Promise<State[]> {
	return await prisma.state.findMany({
		where: { ...(id && { id }) },
		...(limit && { take: limit }),
		...(pageNo && { skip: (pageNo - 1) * limit }),
	})
}
