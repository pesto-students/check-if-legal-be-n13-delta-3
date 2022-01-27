import { GoogleOAuth } from "@prisma/client"
import { prisma } from "../../core/prisma"

export async function createGoogleOAuth(payload: {
	userId: number
	googleUserId: string
	email?: string
}): Promise<GoogleOAuth> {
	/**
	 * //TODO: Check if user already has a googleOAuth
	 */
	return await prisma.googleOAuth.create({ data: payload })
}
