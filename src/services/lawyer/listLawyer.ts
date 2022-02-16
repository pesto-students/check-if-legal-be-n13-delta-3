import { Lawyer } from "@prisma/client"
import _ from "lodash"
import { prisma } from "../../core/prisma"

export async function listLawyer({
	filter: { id, userId, cityId, isAvailable, isSuspended, isVerified } = {},
	pagination: { limit = 10, pageNo = 1 } = {},
	include,
}: {
	filter?: {
		id?: number
		userId?: number
		cityId?: number
		isAvailable?: boolean
		isVerified?: boolean
		isSuspended?: boolean
	}
	pagination?: { pageNo?: number; limit?: number }
	include?: { user?: boolean; city?: boolean }
} = {}): Promise<Lawyer[]> {
	return await prisma.lawyer.findMany({
		where: {
			...(id && { id }),
			...(userId && { userId }),
			...(cityId && { cityId }),
			...(_.isBoolean(isAvailable) && { isAvailable }),
			...(_.isBoolean(isVerified) && { isVerified }),
			...(_.isBoolean(isSuspended) && { isSuspended }),
		},
		include: {
			...include,
			...(include?.city && { city: { include: { state: true } } }),
		},
		orderBy: { name: "asc" },
		...(limit && { take: limit }),
		...(pageNo && { skip: (pageNo - 1) * limit }),
	})
}
