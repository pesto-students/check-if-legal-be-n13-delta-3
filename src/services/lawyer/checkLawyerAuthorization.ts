import { Lawyer } from "@prisma/client"
import { UnauthorisedError, UnprocessableEntityError } from "../../core/http"
import { listLawyer } from "./listLawyer"

export async function checkLawyerAuthorization(userId: number): Promise<Lawyer> {
	const [lawyer] = await listLawyer({ filter: { userId } })
	if (!lawyer) throw new UnprocessableEntityError("Lawyer not found")
	if (lawyer.isSuspended) throw new UnauthorisedError("Lawyer is not authorized")

	return lawyer
}
