import { UnprocessableEntityError } from "../../core/http"
import { prisma } from "../../core/prisma"

export async function deleteLawyerBank(filter: { id: number }): Promise<void> {
	const lawyerBank = await prisma.lawyerBank.findFirst({ where: filter })
	if (!lawyerBank) throw new UnprocessableEntityError("Invalid lawyer bank")

	await prisma.lawyerBank.delete({ where: filter })
}
