import { HttpApi, HttpMethod } from "../../core/http"
import { listLanguage } from "../../services/language/listLanguage"

export const apiLanguageList = new HttpApi({
	method: HttpMethod.GET,
	endpoint: "/language",
	handler: () => listLanguage(),
})
