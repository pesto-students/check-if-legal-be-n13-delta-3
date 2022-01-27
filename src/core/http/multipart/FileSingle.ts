import { IFileData } from "."
import _ from "lodash"

interface IValidation {
	optional?: boolean
}

export class FileSingle {
	validation: IValidation

	constructor() {
		this.validation = {}
	}

	optional() {
		this.validation.optional = true
		return this
	}

	parse(payload: unknown): IFileData | undefined {
		if (_.isArray(payload)) {
			throw new Error("Only single file allowed")
		}
		if (_.isUndefined(payload) && !this.validation.optional) {
			throw new Error("required")
		}
		return payload as IFileData
	}
}
