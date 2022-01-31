import { apiReviewCreate } from "./apiReviewCreate"
import { apiReviewDocumentUpload } from "./apiReviewDocumentUpload"
import { apiReviewGetDetails } from "./apiReviewGetDetails"
import { apiReviewList } from "./apiReviewList"
import { apiReviewNoteUpdate } from "./apiReviewNoteUpdate"
import reviewFeedbackApis from "./feedback"

export default [
	apiReviewCreate,
	apiReviewDocumentUpload,
	apiReviewList,
	apiReviewGetDetails,
	apiReviewNoteUpdate,
	...reviewFeedbackApis,
]
