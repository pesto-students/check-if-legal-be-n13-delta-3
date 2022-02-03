import { apiLawyerRegistration } from "./apiLawyerRegistration"
import { apiLawyerList } from "./apiLawyerList"
import { apiLawyerSelfGet } from "./apiLawyerSelfGet"
import { apiLawyerProofUpload } from "./apiLawyerProofUpload"
import { apiLawyerVerify } from "./apiLawyerVerify"
import lawyerBankApis from "./bank"

export default [
	apiLawyerRegistration,
	apiLawyerList,
	apiLawyerSelfGet,
	apiLawyerProofUpload,
	apiLawyerVerify,
	...lawyerBankApis,
]
