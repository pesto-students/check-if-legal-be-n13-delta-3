import { LawyerBank } from "@prisma/client"
import { prisma } from "../../core/prisma"

export async function getLawyerBank(filter: {
	lawyerId?: number
}): Promise<LawyerBank | null> {
	return await prisma.lawyerBank.findFirst({ where: filter })
}
