import { prisma } from "../../core/prisma"
import { getLawyerBank } from "./getLawyerBank"

export async function deleteLawyerBank(filter: { lawyerId: number }): Promise<void> {
	const lawyerBank = await getLawyerBank(filter)
	if (!lawyerBank) return
	await prisma.lawyerBank.delete({ where: filter })
}
