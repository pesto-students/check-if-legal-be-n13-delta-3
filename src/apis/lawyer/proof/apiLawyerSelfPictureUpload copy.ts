import multer from "multer"
import { AuthRole } from "../../../core/enums"
import {
	BadRequestError,
	ForbiddenError,
	HttpApi,
	HttpMethod,
	UnprocessableEntityError,
} from "../../../core/http"
import { userAuth } from "../../../helpers/auth/userAuth"
import { getLawyerPictureDirPath } from "../../../helpers/directoryPaths"
import { copyFile } from "../../../helpers/fs"
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

export const apiLawyerSelfPictureUpload = new HttpApi({
	method: HttpMethod.POST,
	endpoint: "/lawyer/self/picture",
	middlewares: [upload.single("picture")],
	handler: async ({ req }) => {
		const authPayload = userAuth(req, [AuthRole.LAWYER])
		const { lawyerId } = await getUserOrLawyerFromAuth(authPayload)

		if (!req.file) throw new BadRequestError("Image file required")
		const picture: Express.Multer.File = req.file

		const [lawyer] = await listLawyer({ filter: { id: lawyerId } })
		if (!lawyer) throw new UnprocessableEntityError("Lawyer not found")
		if (lawyer.isVerified) {
			throw new ForbiddenError("Verified lawyer is not allowed to upload picture")
		}

		const dest = getLawyerPictureDirPath(lawyer.id)
		const fileName = `${lawyer.id}.jpg`
		await copyFile({ src: picture.path, dest, fileName })
	},
})
