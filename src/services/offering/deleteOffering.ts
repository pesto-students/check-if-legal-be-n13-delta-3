import { UnprocessableEntityError } from "../../core/http"
import { prisma } from "../../core/prisma"

export async function deleteOffering(filter: { id: number }): Promise<void> {
	const offering = await prisma.offering.findFirst({ where: filter })
	if (!offering) throw new UnprocessableEntityError("Invalid offering")

	await prisma.offering.delete({ where: filter })
}
