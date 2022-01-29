import { OAuth2Client } from "google-auth-library"
import configs from "../../core/configs"
import { UnprocessableEntityError } from "../../core/http"

export async function verifyGoogleOAuthIdToken(idToken: string) {
	const clientId = configs.googleAuth.clientId
	if (!clientId) {
		throw new Error("Google Auth Client ID is not configured")
	}

	const client = new OAuth2Client(clientId)
	const ticket = await client.verifyIdToken({ idToken, audience: clientId })

	const payload = ticket.getPayload()
	if (!payload) {
		throw new UnprocessableEntityError("Google Auth Token is invalid")
	}

	return { googleUserId: payload.sub, email: payload.email, name: payload.name }
}
