import { apiReviewClose } from "./apiReviewClose"
import { apiReviewCreate } from "./apiReviewCreate"
import { apiReviewList } from "./apiReviewList"
import { apiReviewNoteUpdate } from "./apiReviewNoteUpdate"
import reviewDocumentApis from "./document"
import reviewFeedbackApis from "./feedback"
import reviewPaymentApis from "./payment"

export default [
	apiReviewCreate,
	apiReviewList,
	apiReviewNoteUpdate,
	apiReviewClose,
	...reviewFeedbackApis,
	...reviewPaymentApis,
	...reviewDocumentApis,
]
