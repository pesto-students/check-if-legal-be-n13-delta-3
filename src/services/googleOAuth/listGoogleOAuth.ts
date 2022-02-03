import { GoogleOAuth } from "@prisma/client"
import { prisma } from "../../core/prisma"

export async function listGoogleOAuth({
	filter,
	include,
}: {
	filter?: { id?: number; googleUserId?: string; userId?: number; email?: string }
	include?: { user?: boolean }
} = {}): Promise<GoogleOAuth[]> {
	return await prisma.googleOAuth.findMany({ where: filter, include })
}
