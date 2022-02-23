import path from "path"
import { z } from "zod"
import { AuthRole } from "../../../core/enums"
import {
	ForbiddenError,
	HttpApi,
	HttpMethod,
	UnprocessableEntityError,
} from "../../../core/http"
import { userAuth } from "../../../helpers/auth/userAuth"
import { getLawyerProofDirPath } from "../../../helpers/directoryPaths"
import { deleteFile } from "../../../helpers/fs"
import { listLawyer } from "../../../services/lawyer/listLawyer"
import { getUserOrLawyerFromAuth } from "../../../services/user/getUserOrLawyerFromAuth"

export const apiLawyerSelfProofDelete = new HttpApi({
	method: HttpMethod.DELETE,
	endpoint: "/lawyer/self/proof/:fileName",
	paramsSchema: z.object({ fileName: z.string() }).strict(),
	handler: async ({ req, params }) => {
		const auth = userAuth(req, [AuthRole.LAWYER])
		const { lawyerId } = await getUserOrLawyerFromAuth(auth)

		const [lawyer] = await listLawyer({ filter: { id: lawyerId } })
		if (!lawyer) throw new UnprocessableEntityError("Lawyer not found")
		if (lawyer.isVerified) {
			throw new ForbiddenError("Verified lawyer is not allowed to delete proofs")
		}

		const dirPath = getLawyerProofDirPath(lawyer.id)
		const filePath = path.join(dirPath, params.fileName)
		await deleteFile(filePath)
	},
})
