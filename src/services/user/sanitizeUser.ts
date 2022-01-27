import { User } from "@prisma/client"

export function sanitizeUser(user: User) {
	// @ts-ignore
	user.createdAt = undefined
	// @ts-ignore
	user.updatedAt = undefined
	// @ts-ignore
	user.isLawyer = undefined
	// @ts-ignore
	user.isSuspended = undefined

	return user
}
