import { LawyerBank } from "@prisma/client"
import { prisma } from "../../core/prisma"

export async function listLawyerBank({
	filter: { id, lawyerId } = {},
	pagination: { limit = 10, pageNo = 1 } = {},
}: {
	filter?: { id?: number; lawyerId?: number }
	pagination?: { pageNo?: number; limit?: number }
} = {}): Promise<LawyerBank[]> {
	return await prisma.lawyerBank.findMany({
		where: {
			...(id && { id }),
			...(lawyerId && { lawyerId }),
		},
		orderBy: { bankName: "asc" },
		...(limit && { take: limit }),
		...(pageNo && { skip: (pageNo - 1) * limit }),
	})
}
