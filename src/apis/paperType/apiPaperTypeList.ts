import { HttpApi, HttpMethod } from "../../core/http"
import { listPaperType } from "../../services/paperType/listPaperType"

export const apiPaperTypeList = new HttpApi({
	method: HttpMethod.GET,
	endpoint: "/paperType",
	handler: () => listPaperType(),
})
