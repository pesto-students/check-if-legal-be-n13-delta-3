import { HttpApi, HttpMethod } from "../../core/http"
import { listCity } from "../../services/city/listCity"

export const apiCityList = new HttpApi({
	method: HttpMethod.GET,
	endpoint: "/city",
	handler: () => listCity({ include: { state: true } }),
})
