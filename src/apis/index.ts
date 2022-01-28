import adminApis from "./admin"
import lawyerApis from "./lawyer"
import reviewApis from "./review"
import userApis from "./user"
import reviewFeedbackApis from "./reviewFeedback"

export default [
	...adminApis,
	...reviewApis,
	...userApis,
	...lawyerApis,
	...reviewFeedbackApis,
]
