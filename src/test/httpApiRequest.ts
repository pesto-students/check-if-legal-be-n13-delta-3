import { expect } from "chai"
import _ from "lodash"
import { HttpMethod, HttpStatusCode } from "../core/http"
import { requester } from "./setup"

export async function httpApiRequest({
	method,
	endpoint,
	body,
	query,
	files,
	auth,
	expectedStatusCode = HttpStatusCode.OK,
	isMultipartFormData,
}: {
	method: HttpMethod
	endpoint: string
	body?: string | object
	query?: string | object
	files?: {
		[key: string]:
			| Parameters<typeof client.attach>[1]
			| Parameters<typeof client.attach>[1][]
	}
	auth?: string
	expectedStatusCode?: HttpStatusCode
	isMultipartFormData?: boolean
}): Promise<any> {
	const client = requester[method](endpoint)

	const authToken = auth || undefined
	if (authToken) client.set("Authorization", `Bearer ${authToken}`)
	if (isMultipartFormData) {
		client.set("Content-Type", "multipart/form-data")

		if (body) {
			for (let [key, value] of Object.entries(body)) {
				client.field(key, value)
			}
		}

		if (files) {
			let i = 0
			for (let [key, value] of Object.entries(files)) {
				if (_.isArray(value)) {
					value.forEach((file) => client.attach(key, file, `file-${i++}.jpg`))
				} else {
					client.attach(key, value, `file-${i++}.jpg`)
				}
			}
		}
	} else {
		if (body) client.send(body)
	}

	if (query) client.query(query)

	const response = await client
	expect(response.status).equal(
		expectedStatusCode,
		`${response.body?.name}: ${response.body?.message}  ${response.body?.stack}`,
	)

	return response.body
}
