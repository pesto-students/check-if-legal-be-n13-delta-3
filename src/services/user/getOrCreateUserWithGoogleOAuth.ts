import { User } from "@prisma/client"
import { prisma } from "../../core/prisma"

export async function getOrCreateUserWithGoogleOAuth({
	name,
	isLawyer,
	isSuspended,
	googleUserId,
	email,
}: {
	name?: string
	isLawyer?: boolean
	isSuspended?: boolean
	googleUserId: string
	email?: string
}): Promise<User> {
	const googleOAuth = await prisma.googleOAuth.findFirst({
		where: { googleUserId },
		include: { user: true },
	})
	if (googleOAuth) return googleOAuth.user

	return await prisma.user.create({
		data: {
			name: name ?? "Anonymous User",
			isLawyer,
			isSuspended,
			googleOAuth: { create: { googleUserId, email } },
		},
	})
}
