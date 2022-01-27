import { IFileData } from "."
import _ from "lodash"

interface IValidation {
	optional?: boolean
}

export class FileMultiple {
	validation: IValidation

	constructor() {
		this.validation = {}
	}

	optional() {
		this.validation.optional = true
		return this
	}

	parse(payload: unknown): IFileData[] | undefined {
		if (_.isUndefined(payload) && !this.validation.optional) {
			throw new Error("required")
		}
		if (!_.isArray(payload)) payload = [payload]

		return payload as IFileData[]
	}
}
