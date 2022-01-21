import jwt, { JsonWebTokenError } from "jsonwebtoken"
import configs from "../configs"
import { AuthRole } from "../enums"
import { UnauthorisedError } from "../http"

const secret = configs.jwt.secret
const issuer = configs.server.name
const subject = "auth-token"
const expiresIn = "12h"

export interface IAuthPayload {
	role: AuthRole
	id: string
}

export function createAuthToken(payload: IAuthPayload) {
	return jwt.sign(payload, secret, { issuer, expiresIn, subject })
}

export function validateAuthToken(token: string): IAuthPayload {
	try {
		const { id, role } = jwt.verify(token, secret, { issuer }) as IAuthPayload
		return { id, role }
	} catch (err) {
		if (err instanceof JsonWebTokenError) {
			throw new UnauthorisedError("Invalid auth token")
		}
		throw err
	}
}
