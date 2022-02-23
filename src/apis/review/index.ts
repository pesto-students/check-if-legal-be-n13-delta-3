import { apiReviewCancel } from "./apiReviewCancel"
import { apiReviewClose } from "./apiReviewClose"
import { apiReviewCreate } from "./apiReviewCreate"
import { apiReviewGet } from "./apiReviewGet"
import { apiReviewList } from "./apiReviewList"
import { apiReviewNoteUpdate } from "./apiReviewNoteUpdate"
import reviewDocumentApis from "./document"
import reviewFeedbackApis from "./feedback"
import reviewPaymentApis from "./payment"
import reviewRatingApis from "./rating"

export default [
	apiReviewCreate,
	apiReviewList,
	apiReviewGet,
	apiReviewNoteUpdate,
	apiReviewClose,
	apiReviewCancel,
	...reviewFeedbackApis,
	...reviewPaymentApis,
	...reviewDocumentApis,
	...reviewRatingApis,
]
