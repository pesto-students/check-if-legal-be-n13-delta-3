import adminApis from "./admin"
import lawyerApis from "./lawyer"
import offeringApis from "./offering"
import reviewApis from "./review"
import userApis from "./user"

export default [...adminApis, ...reviewApis, ...userApis, ...lawyerApis, ...offeringApis]
