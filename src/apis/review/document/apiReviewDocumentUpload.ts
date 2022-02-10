import { ReviewStatus } from "@prisma/client"
import _ from "lodash"
import multer from "multer"
import { z } from "zod"
import { AuthRole } from "../../../core/enums"
import {
	BadRequestError,
	HttpApi,
	HttpMethod,
	UnprocessableEntityError,
} from "../../../core/http"
import { userAuth } from "../../../helpers/auth/userAuth"
import { getReviewDocsDirPath } from "../../../helpers/directoryPaths"
import { encryptFile } from "../../../helpers/encrypt"
import { saveFile } from "../../../helpers/fs"
import { listReview } from "../../../services/review/listReview"
import { updateReview } from "../../../services/review/updateReview"

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
		if (review.status === ReviewStatus.CLOSED) {
			throw new UnprocessableEntityError("Review is closed")
		}

		for (const file of documents) {
			const encryptedFile = await encryptFile(file.path)
			const dest = getReviewDocsDirPath(reviewId)
			await saveFile(dest, encryptedFile, file.originalname)
		}

		if (review.status === ReviewStatus.INITIAL) {
			await updateReview({
				filter: { id: reviewId },
				update: { status: ReviewStatus.WAITING_FOR_PAYMENT },
			})
		}
	},
})
