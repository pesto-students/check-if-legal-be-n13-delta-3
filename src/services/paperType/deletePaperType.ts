import { UnprocessableEntityError } from "../../core/http"
import { prisma } from "../../core/prisma"

export async function deletePaperType(filter: { id: number }): Promise<void> {
	const paperType = await prisma.paperType.findFirst({ where: filter })
	if (!paperType) throw new UnprocessableEntityError("Invalid paper-type")

	await prisma.paperType.delete({ where: filter })
}
