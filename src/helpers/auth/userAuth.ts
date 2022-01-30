import { Request } from "express"
import { IAuthPayload, validateAuthToken } from "./authToken"
import { AuthRole } from "../../core/enums"
import _ from "lodash"
import { UnauthorisedError, UnprocessableEntityError } from "../../core/http"

export function userAuth(req: Request, allowedRoles: AuthRole[]): IAuthPayload {
	const authHeaderValue = req.header("Authorization")
	if (!authHeaderValue) {
		throw new UnauthorisedError("Authentication is missing")
	}

	const token = extractBearerToken(authHeaderValue)
	const authPayload = validateAuthToken(token)
	if (!allowedRoles.includes(authPayload.role)) {
		throw new UnauthorisedError("User does not have permission")
	}

	return authPayload
}

function extractBearerToken(data: string) {
	const [_bearer, token] = data.split(" ")
	if (!_bearer || !token) {
		throw new UnprocessableEntityError("Invalid auth token")
	}
	return token
}
