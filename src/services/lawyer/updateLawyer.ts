import { Lawyer } from "@prisma/client"
import { UnprocessableEntityError } from "../../core/http"
import { prisma } from "../../core/prisma"
import { listLawyer } from "./listLawyer"

export async function updateLawyer({
	filter,
	update: { name, address, cityId, phone, description },
}: {
	filter: { id: number }
	update: {
		name?: string
		address?: string
		phone?: string
		cityId?: number
		description?: string | null
	}
}): Promise<Lawyer> {
	const [lawyer] = await listLawyer({ filter })
	if (!lawyer) throw new UnprocessableEntityError("Lawyer does not exist")

	return await prisma.lawyer.update({
		where: filter,
		data: { name, address, phone, cityId, description },
	})
}
