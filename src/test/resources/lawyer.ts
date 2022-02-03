import { randJobDescriptor, randPhoneNumber, randStreetAddress } from "@ngneat/falso"
import { User } from "@prisma/client"
import { createLawyer } from "../../services/lawyer/createLawyer"
import { listUser } from "../../services/user/listUser"
import { generateCity } from "./city"
import { generateUser } from "./user"

export async function generateLawyer({
	isVerified,
	userId,
	cityId,
	isSuspended,
	isAvailable,
}: {
	userId?: number
	cityId?: number
	isSuspended?: boolean
	isVerified?: boolean
	isAvailable?: boolean
} = {}) {
	let user: User
	if (userId) {
		const userList = await listUser({ filter: { id: userId, isLawyer: true } })
		if (userList.length !== 1) throw new Error("User not found")
		user = userList[0]
	} else {
		user = await generateUser({ isLawyer: true })
	}

	if (!cityId) cityId = (await generateCity()).id

	const name = user.name
	const address = randStreetAddress()
	const description = randJobDescriptor()
	const phone = randPhoneNumber()

	return await createLawyer({
		name,
		address,
		cityId,
		isVerified,
		isAvailable,
		isSuspended,
		phone,
		userId: user.id,
		description,
	})
}
