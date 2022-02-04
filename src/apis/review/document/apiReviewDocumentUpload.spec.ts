import { expect } from "chai"
import { readFileSync } from "fs"
import { AuthRole } from "../../../core/enums"
import { HttpMethod, HttpStatusCode } from "../../../core/http"
import { createAuthToken } from "../../../helpers/auth/authToken"
import { getReviewDocsDirPath } from "../../../helpers/directoryPaths"
import { getDirFiles } from "../../../helpers/fs"
import { getTestAssetsPath } from "../../../test/helpers"
import { httpApiRequest } from "../../../test/httpApiRequest"
import { generateReview } from "../../../test/resources/review"
import { generateUser } from "../../../test/resources/user"
import { truncateDatabase } from "../../../test/truncateDatabase"

const method = HttpMethod.POST
function getEndpoint(reviewId: number | string) {
	return `/review/${reviewId}/document`
}

describe(`API: ${method} ${getEndpoint(":reviewId")}`, () => {
	let userId: number
	let auth: string

	before(async () => {
		await truncateDatabase()
		userId = (await generateUser()).id
		auth = createAuthToken({ id: userId, role: AuthRole.USER })
	})

	/**
	 * Success cases
	 */
	it(`Success`, async () => {
		const { id: reviewId } = await generateReview({ userId })
		const documents = [
			readFileSync(getTestAssetsPath("document.jpg")),
			readFileSync(getTestAssetsPath("document.jpg")),
		]

		const res = await httpApiRequest({
			method,
			endpoint: getEndpoint(reviewId),
			auth,
			isMultipartFormData: true,
			files: { documents },
			expectedStatusCode: HttpStatusCode.NO_CONTENT,
		})
		expect(res).empty

		const reviewDocsDir = getReviewDocsDirPath(reviewId)
		const files = await getDirFiles(reviewDocsDir)
		expect(files.length).equals(documents.length)
	})
})
