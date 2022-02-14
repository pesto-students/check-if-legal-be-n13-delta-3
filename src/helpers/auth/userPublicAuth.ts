import { Request } from "express"
import { AuthRole } from "../../core/enums"
import { ForbiddenError } from "../../core/http"
import { IAuthPayload, validateAuthToken } from "./authToken"

/**
 * Also allows user access without auth token
 */
export function userPublicAuth(
	req: Request,
	allowedRoles: AuthRole[],
): IAuthPayload | null {
	const authHeaderValue = req.header("Authorization")
	if (!authHeaderValue) return null

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
