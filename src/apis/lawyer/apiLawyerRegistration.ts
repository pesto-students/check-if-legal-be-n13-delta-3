import { z } from "zod"
import { userAuth } from "../../core/auth"
import { AuthRole } from "../../core/enums"
import { getLawyerIdProofsDirPath } from "../../core/helpers/directoryPaths"
import { copyFile } from "../../core/helpers/fs"
import { createdResponse, HttpApi, HttpMethod } from "../../core/http"
import { F, IFileData } from "../../core/http/multipart"
import { createLawyer } from "../../services/lawyer/createLawyer"

const bodySchema = z
	.object({
		name: z.string().max(100),
		cityId: z.number(),
		address: z.string().max(400),
		description: z.string().max(400),
		phone: z.string().max(20),
	})
	.strict()
const filesSchema = F.object({ identityProofs: F.multiple() })

export const apiLawyerRegistration = new HttpApi({
	method: HttpMethod.POST,
	endpoint: "/lawyer/registration",
	acceptMultipartFormData: true,
	options: {
		formData: { autoClean: true, uploadDir: "temp", maxFilesSize: 1024 * 1024 * 10 },
	},
	bodySchema,
	filesSchema,
	handler: async ({ req, body, files }) => {
		const identityProofFiles = files.identityProofs as IFileData[]
		const { id: userId } = userAuth(req, [AuthRole.LAWYER])

		const lawyer = await createLawyer({ ...body, userId })
		for (const file of identityProofFiles) {
			const dest = getLawyerIdProofsDirPath(lawyer.id)
			await copyFile({ src: file.path, dest })
		}

		return createdResponse({ id: lawyer.id })
	},
})
