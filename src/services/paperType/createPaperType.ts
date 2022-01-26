import { PaperType } from "@prisma/client"
import { prisma } from "../../core/prisma"
import { checkPaperTypeNameAvailability } from "./checkPaperTypeNameAvailability"

export async function createPaperType({ name }: { name: string }): Promise<PaperType> {
	await checkPaperTypeNameAvailability(name)
	return await prisma.paperType.create({ data: { name } })
}
