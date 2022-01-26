import { randFullName } from "@ngneat/falso"
import { createUser } from "../../../services/user/createUser"

export async function generateUser({
	isLawyer,
	isSuspended,
}: {
	isLawyer?: boolean
	isSuspended?: boolean
} = {}) {
	const name = randFullName()
	return await createUser({ name, isLawyer, isSuspended })
}
