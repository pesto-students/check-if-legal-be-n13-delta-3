import adminApis from "./admin"
import cityApis from "./city"
import languageApis from "./language"
import lawyerApis from "./lawyer"
import offeringApis from "./offering"
import paperTypeApis from "./paperType"
import paymentApis from "./payment"
import reviewApis from "./review"
import stateApis from "./state"
import userApis from "./user"
import ratingApis from "./rating"

export default [
	...adminApis,
	...reviewApis,
	...userApis,
	...lawyerApis,
	...offeringApis,
	...cityApis,
	...stateApis,
	...languageApis,
	...paperTypeApis,
	...paymentApis,
	...ratingApis,
]
