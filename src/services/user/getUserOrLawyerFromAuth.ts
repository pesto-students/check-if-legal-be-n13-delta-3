import { AuthRole } from "../../core/enums"
import { UnauthorisedError } from "../../core/http"
import { IAuthPayload } from "../../helpers/auth/authToken"
import { checkLawyerAuthorization } from "../lawyer/checkLawyerAuthorization"

export async function getUserOrLawyerFromAuth({ role, id }: IAuthPayload) {
	let userId: number | undefined = undefined
	let lawyerId: number | undefined = undefined

	if (role === AuthRole.USER) userId = id
	else if (role === AuthRole.LAWYER) {
		const lawyer = await checkLawyerAuthorization(id)
		lawyerId = lawyer.id
	} else {
		throw new UnauthorisedError("User is unauthorized")
	}

	return { userId, lawyerId }
}
