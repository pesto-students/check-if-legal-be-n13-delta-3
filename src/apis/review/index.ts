import { apiReviewClose } from "./apiReviewClose"
import { apiReviewCreate } from "./apiReviewCreate"
import { apiReviewGetDetails } from "./apiReviewGetDetails"
import { apiReviewList } from "./apiReviewList"
import { apiReviewNoteUpdate } from "./apiReviewNoteUpdate"
import reviewDocumentApis from "./document"
import reviewFeedbackApis from "./feedback"
import reviewPaymentApis from "./payment"

export default [
	apiReviewCreate,
	apiReviewList,
	apiReviewGetDetails,
	apiReviewNoteUpdate,
	apiReviewClose,
	...reviewFeedbackApis,
	...reviewPaymentApis,
	...reviewDocumentApis,
]
