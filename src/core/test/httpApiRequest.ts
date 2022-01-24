import { expect } from "chai"
import { HttpMethod, HttpStatusCode } from "../http"
import { requester } from "./setup"

export async function httpApiRequest({
	method,
	endpoint,
	body,
	auth,
	expectedStatusCode = HttpStatusCode.OK,
}: {
	method: HttpMethod
	endpoint: string
	body?: string | object
	auth?: string
	expectedStatusCode?: HttpStatusCode
}): Promise<any> {
	const client = method === "post" ? requester.post(endpoint) : requester.get(endpoint)

	const authToken = auth || undefined
	if (authToken) client.set("Authorization", `Bearer ${authToken}`)
	if (body) client.send(body)

	const response = await executeHttpRequest(client)
	expect(response.status).equal(
		expectedStatusCode,
		`${response.body?.name}: ${response.body?.message}  ${response.body?.stack}`,
	)

	return response.body
}

async function executeHttpRequest(
	client: ReturnType<typeof requester.post>,
): Promise<ChaiHttp.Response> {
	return await client
}
