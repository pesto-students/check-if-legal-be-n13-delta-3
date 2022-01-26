import { PrismaClient } from "@prisma/client"
import { UnprocessableEntityError } from "../../core/http"

export async function checkPaperTypeNameAvailability(name: string) {
	const prisma = new PrismaClient()
	const paperType = await prisma.paperType.findFirst({
		where: { name: { equals: name.toLowerCase(), mode: "insensitive" } },
	})
	if (!paperType) return
	throw new UnprocessableEntityError(`Paper-type with name ${name} already exists`)
}
