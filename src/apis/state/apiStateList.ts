import { HttpApi, HttpMethod } from "../../core/http"
import { listState } from "../../services/state/listState"

export const apiStateList = new HttpApi({
	method: HttpMethod.GET,
	endpoint: "/state",
	handler: () => listState(),
})
