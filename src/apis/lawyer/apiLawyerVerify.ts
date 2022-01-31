import { z } from "zod"
import { AuthRole } from "../../core/enums"
import { HttpApi, HttpMethod } from "../../core/http"
import { userAuth } from "../../helpers/auth/userAuth"
import { getLawyerProofDirPath } from "../../helpers/directoryPaths"
import { deleteDir } from "../../helpers/fs"
import { verifyLawyer } from "../../services/lawyer/verifyLawyer"

export const apiLawyerVerify = new HttpApi({
	method: HttpMethod.POST,
	endpoint: "/lawyer/:lawyerId/verify",
	paramsSchema: z.object({ lawyerId: z.string() }),
	handler: async ({ req, params }) => {
		userAuth(req, [AuthRole.ADMIN])
		const lawyerId = +params.lawyerId

		await verifyLawyer({ id: lawyerId })
		const lawyerProofDir = getLawyerProofDirPath(lawyerId)
		await deleteDir(lawyerProofDir)
	},
})
