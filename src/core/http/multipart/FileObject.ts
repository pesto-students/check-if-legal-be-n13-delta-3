import _ from "lodash"
import { BadRequestError } from ".."
import { FileMultiple } from "./FileMultiple"
import { FileSingle } from "./FileSingle"

export type FileObjectSchemaType = {
	[name: string]: FileSingle | FileMultiple
}

interface IValidation {
	optional?: boolean
	nonStrict?: boolean
}

export class FileObject {
	validation: IValidation
	schema: FileObjectSchemaType

	constructor(schema: FileObjectSchemaType) {
		this.validation = {}
		this.schema = schema
	}

	optional() {
		this.validation.optional = true
		return this
	}

	nonStrict() {
		this.validation.nonStrict = true
		return this
	}

	parse(payload: unknown) {
		let parsedObject: object | undefined = {}

		if (!_.isObject(payload)) {
			if (_.isUndefined(payload)) {
				if (this.validation.optional) return undefined
				throw new Error("undefined value not allowed")
			} else {
				throw new Error(`${typeof payload} type not allowed`)
			}
		}

		if (_.isEmpty(payload)) {
			if (this.validation.optional) return undefined
			throw new Error("empty not allowed")
		}

		if (!this.validation.nonStrict) {
			Object.keys(payload).forEach((key) => {
				if (!_.hasIn(this.schema, key)) {
					throw new Error(`${key}: is not allowed`)
				}
			})
		}

		for (const el of Object.entries(this.schema)) {
			try {
				const parsedFieldValue = el[1].parse(_.get(payload, el[0], undefined))
				Object.assign(parsedObject, { [el[0]]: parsedFieldValue })
			} catch (err) {
				if (err instanceof Error) {
					throw new BadRequestError(`${el[0]}: ${err.message}`, err.stack)
				}
				throw err
			}
		}

		return parsedObject
	}
}
