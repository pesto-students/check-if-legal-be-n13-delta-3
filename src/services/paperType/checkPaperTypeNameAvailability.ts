import { ConflictError } from "../../core/http"
import { prisma } from "../../core/prisma"

export async function checkPaperTypeNameAvailability(name: string) {
	const paperType = await prisma.paperType.findFirst({
		where: { name: { equals: name.toLowerCase(), mode: "insensitive" } },
	})
	if (!paperType) return
	throw new ConflictError(`Paper-type with name ${name} already exists`)
}
