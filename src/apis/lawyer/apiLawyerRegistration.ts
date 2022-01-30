import _ from "lodash"
import multer from "multer"
import { z } from "zod"
import { AuthRole } from "../../core/enums"
import { BadRequestError, createdResponse, HttpApi, HttpMethod } from "../../core/http"
import { userAuth } from "../../helpers/auth/userAuth"
import { getLawyerIdProofsDirPath } from "../../helpers/directoryPaths"
import { copyFile } from "../../helpers/fs"
import { createLawyer } from "../../services/lawyer/createLawyer"

const bodySchema = z
	.object({
		name: z.string().max(100),
		cityId: z.string(),
		address: z.string().max(400),
		description: z.string().max(400),
		phone: z.string().max(20),
	})
	.strict()

const upload = multer({
	dest: "temp/",
	fileFilter: (_req, file, cb) => {
		if (!["image/png", "image/jpeg"].includes(file.mimetype)) {
			return cb(new BadRequestError("Wrong file type"))
		}
		cb(null, true)
	},
})

export const apiLawyerRegistration = new HttpApi({
	method: HttpMethod.POST,
	endpoint: "/lawyer/register",
	bodySchema,
	middlewares: [upload.array("proofs", 4)],
	handler: async ({ req, body }) => {
		if (!req.files) throw new BadRequestError("Files required")
		let proofFiles: Express.Multer.File[] = []
		if (_.isArray(req.files)) {
			proofFiles = req.files.filter((file) => file.fieldname === "proofs")
		}

		if (_.isEmpty(proofFiles)) {
			throw new BadRequestError("Identity proof files required")
		}

		const { id: userId } = userAuth(req, [AuthRole.LAWYER])
		const lawyer = await createLawyer({ ...body, cityId: +body.cityId, userId })

		for (const file of proofFiles) {
			const dest = getLawyerIdProofsDirPath(lawyer.id)
			await copyFile({ src: file.path, dest, fileName: file.originalname })
		}
		return createdResponse({ id: lawyer.id })
	},
})
