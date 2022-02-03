import { Request } from "express"
import { AuthRole } from "../../core/enums"
import { ForbiddenError } from "../../core/http"
import { IAuthPayload, validateAuthToken } from "./authToken"

export function userAuth(req: Request, allowedRoles: AuthRole[]): IAuthPayload {
	const authHeaderValue = req.header("Authorization")
	if (!authHeaderValue) {
		throw new ForbiddenError("Auth token is missing")
	}

	const token = extractBearerToken(authHeaderValue)
	const authPayload = validateAuthToken(token)
	if (!allowedRoles.includes(authPayload.role)) {
		throw new ForbiddenError("User does not have permission")
	}

	return authPayload
}

function extractBearerToken(data: string) {
	const [_bearer, token] = data.split(" ")
	if (!_bearer || !token) {
		throw new ForbiddenError("Auth token is missing")
	}
	return token
}
