import adminApis from "./admin"
import userApis from "./user"
import reviewApis from "./review"

export default [...adminApis, ...reviewApis, ...userApis]
