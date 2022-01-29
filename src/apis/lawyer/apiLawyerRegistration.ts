import { z } from "zod"
import { AuthRole } from "../../core/enums"
import { getLawyerIdProofsDirPath } from "../../helpers/directoryPaths"
import { copyFile } from "../../helpers/fs"
import { createdResponse, HttpApi, HttpMethod } from "../../core/http"
import { createLawyer } from "../../services/lawyer/createLawyer"
import { userAuth } from "../../helpers/auth/userAuth"
import multer from "multer"

const bodySchema = z
	.object({
		name: z.string().max(100),
		cityId: z.number(),
		address: z.string().max(400),
		description: z.string().max(400),
		phone: z.string().max(20),
	})
	.strict()

const uploadMiddleware = multer({ dest: "temp/" }).fields([
	{ name: "proofs", maxCount: 3 },
])

export const apiLawyerRegistration = new HttpApi({
	method: HttpMethod.POST,
	endpoint: "/lawyer/register",
	bodySchema,
	middlewares: [uploadMiddleware],
	handler: async ({ req, body }) => {
		const { proofs } = req.files as { proofs: Express.Multer.File[] }
		const { id: userId } = userAuth(req, [AuthRole.LAWYER])

		const lawyer = await createLawyer({ ...body, userId })
		for (const file of proofs) {
			const dest = getLawyerIdProofsDirPath(lawyer.id)
			await copyFile({ src: file.path, dest })
		}

		return createdResponse({ id: lawyer.id })
	},
})
