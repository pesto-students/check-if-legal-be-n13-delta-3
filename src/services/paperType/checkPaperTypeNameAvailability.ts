import { prisma } from "../../core/prisma"
import { UnprocessableEntityError } from "../../core/http"

export async function checkPaperTypeNameAvailability(name: string) {
	const paperType = await prisma.paperType.findFirst({
		where: { name: { equals: name.toLowerCase(), mode: "insensitive" } },
	})
	if (!paperType) return
	throw new UnprocessableEntityError(`Paper-type with name ${name} already exists`)
}
