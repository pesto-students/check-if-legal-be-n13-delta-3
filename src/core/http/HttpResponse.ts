import { HttpStatusCode } from "./enums"

export class HttpResponse {
	httpStatusCode: HttpStatusCode
	data: any

	constructor(httpStatusCode: HttpStatusCode, data: any) {
		this.httpStatusCode = httpStatusCode
		this.data = data
	}
}

export function successResponse(data: any) {
	return new HttpResponse(HttpStatusCode.OK, data)
}

export function createdResponse(data: any) {
	return new HttpResponse(HttpStatusCode.CREATED, data)
}

export function emptyResponse() {
	return new HttpResponse(HttpStatusCode.NO_CONTENT, undefined)
}
