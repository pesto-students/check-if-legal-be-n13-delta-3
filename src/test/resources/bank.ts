import _ from "lodash"

export function randomBankIfsc(): string {
	return _.random(10000000000, 99999999999).toString()
}
