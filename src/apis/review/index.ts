import { apiReviewCreate } from "./apiReviewCreate"
import { apiReviewGetDetails } from "./apiReviewGetDetails"
import { apiReviewList } from "./apiReviewList"
import { apiReviewNoteUpdate } from "./apiReviewNoteUpdate"
import reviewFeedbackApis from "./feedback"

export default [
	apiReviewCreate,
	apiReviewList,
	apiReviewGetDetails,
	apiReviewNoteUpdate,
	...reviewFeedbackApis,
]
