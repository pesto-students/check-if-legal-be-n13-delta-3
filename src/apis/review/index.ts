import { apiReviewClose } from "./apiReviewClose"
import { apiReviewCreate } from "./apiReviewCreate"
import { apiReviewDocumentUpload } from "./apiReviewDocumentUpload"
import { apiReviewGetDetails } from "./apiReviewGetDetails"
import { apiReviewList } from "./apiReviewList"
import { apiReviewNoteUpdate } from "./apiReviewNoteUpdate"
import reviewFeedbackApis from "./feedback"
import reviewPaymentApis from "./payment"

export default [
	apiReviewCreate,
	apiReviewDocumentUpload,
	apiReviewList,
	apiReviewGetDetails,
	apiReviewNoteUpdate,
	apiReviewClose,
	...reviewFeedbackApis,
	...reviewPaymentApis,
]
