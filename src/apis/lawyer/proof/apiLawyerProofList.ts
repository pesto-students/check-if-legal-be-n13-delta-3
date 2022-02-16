import { z } from "zod"
import { AuthRole } from "../../../core/enums"
import { HttpApi, HttpMethod, UnprocessableEntityError } from "../../../core/http"
import { userAuth } from "../../../helpers/auth/userAuth"
import { getLawyerProofDirPath } from "../../../helpers/directoryPaths"
import { getDirFiles } from "../../../helpers/fs"
import { listLawyer } from "../../../services/lawyer/listLawyer"

export const apiLawyerProofList = new HttpApi({
	method: HttpMethod.GET,
	endpoint: "/lawyer/:lawyerId/proof",
	paramsSchema: z.object({ lawyerId: z.string() }).strict(),
	handler: async ({ req, params }) => {
		userAuth(req, [AuthRole.ADMIN])

		const lawyerId = +params.lawyerId
		const [lawyer] = await listLawyer({ filter: { id: lawyerId } })
		if (!lawyer) throw new UnprocessableEntityError("Lawyer not found")

		let fileNames: string[] = []
		try {
			const dirPath = getLawyerProofDirPath(lawyer.id)
			fileNames = await getDirFiles(dirPath)
		} catch (err) {
			return []
		}

		return fileNames
	},
})
