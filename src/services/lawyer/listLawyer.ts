import { Lawyer } from "@prisma/client"
import { prisma } from "../../core/prisma"

export async function listLawyer({
	filter: { id, userId, cityId, isAvailable } = {},
	include,
}: {
	filter?: { id?: number; userId?: number; cityId?: number; isAvailable?: boolean }
	include?: { user?: boolean; city?: boolean }
} = {}): Promise<Lawyer[]> {
	return await prisma.lawyer.findMany({
		where: {
			...(id && { id }),
			...(userId && { userId }),
			...(cityId && { cityId }),
			...(isAvailable && { isAvailable }),
		},
		include,
		orderBy: { name: "asc" },
	})
}
