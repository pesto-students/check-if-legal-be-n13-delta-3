import { PaperType } from "@prisma/client"
import { prisma } from "../../core/prisma"
import { checkPaperTypeNameAvailability } from "./checkPaperTypeNameAvailability"
import { listPaperType } from "./listPaperType"

export async function updatePaperType({
	filter,
	update,
}: {
	filter: { id: number }
	update: { name?: string }
}): Promise<PaperType> {
	const [paperType] = await listPaperType({ filter })
	if (!paperType) throw new Error("Invalid paper-type")

	if (update.name) {
		await checkPaperTypeNameAvailability(update.name)
	}
	return await prisma.paperType.update({ where: filter, data: update })
}
