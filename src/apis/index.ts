import adminApis from "./admin"
import lawyerApis from "./lawyer"
import reviewApis from "./review"
import userApis from "./user"

export default [...adminApis, ...reviewApis, ...userApis, ...lawyerApis]
