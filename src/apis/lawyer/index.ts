import { apiLawyerList } from "./apiLawyerList"
import { apiLawyerRegistration } from "./apiLawyerRegister"
import { apiLawyerSelfGet } from "./apiLawyerSelfGet"
import { apiLawyerVerify } from "./apiLawyerVerify"
import lawyerBankApis from "./bank"
import lawyerProofApis from "./proof"

export default [
	apiLawyerRegistration,
	apiLawyerList,
	apiLawyerSelfGet,
	apiLawyerVerify,
	...lawyerBankApis,
	...lawyerProofApis,
]
