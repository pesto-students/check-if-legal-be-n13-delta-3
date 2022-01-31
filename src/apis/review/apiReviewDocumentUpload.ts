import _ from "lodash"
import multer from "multer"
import { z } from "zod"
import { AuthRole } from "../../core/enums"
import { BadRequestError, HttpApi, HttpMethod } from "../../core/http"
import { userAuth } from "../../helpers/auth/userAuth"
import { getReviewDocsDirPath } from "../../helpers/directoryPaths"
import { copyFile } from "../../helpers/fs"
import { listReview } from "../../services/review/listReview"

const paramsSchema = z.object({ reviewId: z.string() }).strict()

const upload = multer({
	dest: "temp/",
	fileFilter: (_req, file, cb) => {
		const allowedTypes = ["image/png", "image/jpeg", "application/pdf"]
		if (!allowedTypes.includes(file.mimetype)) {
			return cb(new BadRequestError("Wrong file type"))
		}
		cb(null, true)
	},
})

export const apiReviewDocumentUpload = new HttpApi({
	method: HttpMethod.POST,
	endpoint: "/review/:reviewId/document",
	paramsSchema,
	middlewares: [upload.array("documents", 20)],
	handler: async ({ req, params }) => {
		const { id: userId } = userAuth(req, [AuthRole.USER])
		const reviewId = +params.reviewId

		if (!req.files) throw new BadRequestError("Files required")
		let documents: Express.Multer.File[] = []
		if (_.isArray(req.files)) {
			documents = req.files.filter((file) => file.fieldname === "documents")
		}
		if (_.isEmpty(documents)) {
			throw new BadRequestError("Document files required")
		}

		const [review] = await listReview({ filter: { id: reviewId, userId } })
		if (!review) throw new BadRequestError("Invalid review")

		for (const file of documents) {
			const dest = getReviewDocsDirPath(reviewId)
			await copyFile({ src: file.path, dest, fileName: file.originalname })
		}
	},
})
