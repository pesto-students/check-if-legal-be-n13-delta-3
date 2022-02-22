import { LawyerBank } from "@prisma/client"
import { prisma } from "../../core/prisma"
import { getLawyerBank } from "./getLawyerBank"

export async function upsertLawyerBank(
	filter: { lawyerId: number },
	payload: { bankName: string; bankIfsc: string; accountNumber: string },
): Promise<LawyerBank> {
	const bank = await getLawyerBank(filter)
	if (bank) {
		return await prisma.lawyerBank.update({ where: filter, data: payload })
	}
	return await prisma.lawyerBank.create({ data: { ...filter, ...payload } })
}
