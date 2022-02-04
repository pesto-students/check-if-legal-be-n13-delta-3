import { AuthRole } from "../../../core/enums"
import {
	ForbiddenError,
	HttpApi,
	HttpMethod,
	UnprocessableEntityError,
} from "../../../core/http"
import { userAuth } from "../../../helpers/auth/userAuth"
import { getLawyerProofDirPath } from "../../../helpers/directoryPaths"
import { getDirFiles } from "../../../helpers/fs"
import { listLawyer } from "../../../services/lawyer/listLawyer"
import { getUserOrLawyerFromAuth } from "../../../services/user/getUserOrLawyerFromAuth"

export const apiLawyerSelfProofList = new HttpApi({
	method: HttpMethod.GET,
	endpoint: "/lawyer/self/proof",
	handler: async ({ req }) => {
		const authPayload = userAuth(req, [AuthRole.LAWYER])
		const { lawyerId } = await getUserOrLawyerFromAuth(authPayload)

		const [lawyer] = await listLawyer({ filter: { id: lawyerId } })
		if (!lawyer) throw new UnprocessableEntityError("Lawyer not found")
		if (lawyer.isVerified) {
			throw new ForbiddenError("Verified lawyer is not allowed to upload proofs")
		}

		const dirPath = getLawyerProofDirPath(lawyer.id)
		return await getDirFiles(dirPath)
	},
})
