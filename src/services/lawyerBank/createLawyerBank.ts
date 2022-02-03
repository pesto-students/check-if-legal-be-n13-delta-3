import { LawyerBank } from "@prisma/client"
import { prisma } from "../../core/prisma"

export async function createLawyerBank(payload: {
	lawyerId: number
	bankName: string
	bankIfsc: string
	accountNumber: string
}): Promise<LawyerBank> {
	return await prisma.lawyerBank.create({ data: payload })
}
