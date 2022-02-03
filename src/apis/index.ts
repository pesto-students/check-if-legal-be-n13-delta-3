import adminApis from "./admin"
import cityApis from "./city"
import lawyerApis from "./lawyer"
import offeringApis from "./offering"
import reviewApis from "./review"
import stateApis from "./state"
import userApis from "./user"

export default [
	...adminApis,
	...reviewApis,
	...userApis,
	...lawyerApis,
	...offeringApis,
	...cityApis,
	...stateApis,
]
