import { Lawyer } from "@prisma/client"
import { ConflictError, UnprocessableEntityError } from "../../core/http"
import { prisma } from "../../core/prisma"
import { listLawyer } from "./listLawyer"

export async function verifyLawyer({ id }: { id: number }): Promise<Lawyer> {
	const [lawyer] = await listLawyer({ filter: { id } })
	if (!lawyer) throw new UnprocessableEntityError("Lawyer not found")
	if (lawyer.isVerified) throw new ConflictError("Lawyer already verified")

	return await prisma.lawyer.update({ where: { id }, data: { isVerified: true } })
}
