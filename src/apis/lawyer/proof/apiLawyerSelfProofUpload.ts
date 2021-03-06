import _ from "lodash"
import multer from "multer"
import { AuthRole } from "../../../core/enums"
import {
	BadRequestError,
	HttpApi,
	HttpMethod,
	UnprocessableEntityError,
	ForbiddenError,
} from "../../../core/http"
import { userAuth } from "../../../helpers/auth/userAuth"
import { getLawyerProofDirPath } from "../../../helpers/directoryPaths"
import { encryptFile } from "../../../helpers/encrypt"
import { saveFile } from "../../../helpers/fs"
import { listLawyer } from "../../../services/lawyer/listLawyer"
import { getUserOrLawyerFromAuth } from "../../../services/user/getUserOrLawyerFromAuth"

const upload = multer({
	dest: "temp/",
	fileFilter: (_req, file, cb) => {
		const allowedTypes = ["image/png", "image/jpeg"]
		if (!allowedTypes.includes(file.mimetype)) {
			return cb(new BadRequestError("Wrong file type"))
		}
		cb(null, true)
	},
})

export const apiLawyerSelfProofUpload = new HttpApi({
	method: HttpMethod.POST,
	endpoint: "/lawyer/self/proof",
	middlewares: [upload.array("proofs", 4)],
	handler: async ({ req }) => {
		const authPayload = userAuth(req, [AuthRole.LAWYER])
		const { lawyerId } = await getUserOrLawyerFromAuth(authPayload)

		if (!req.files) throw new BadRequestError("Files required")
		let proofFiles: Express.Multer.File[] = []
		if (_.isArray(req.files)) {
			proofFiles = req.files.filter((file) => file.fieldname === "proofs")
		}
		if (_.isEmpty(proofFiles)) {
			throw new BadRequestError("Identity proof files required")
		}

		const [lawyer] = await listLawyer({ filter: { id: lawyerId } })
		if (!lawyer) throw new UnprocessableEntityError("Lawyer not found")
		if (lawyer.isVerified) {
			throw new ForbiddenError("Verified lawyer is not allowed to upload proofs")
		}

		for (const file of proofFiles) {
			const encryptedFile = await encryptFile(file.path)
			const dest = getLawyerProofDirPath(lawyer.id)
			await saveFile(dest, encryptedFile, file.originalname)
		}
	},
})
