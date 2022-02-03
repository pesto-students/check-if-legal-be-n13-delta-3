import { expect } from "chai"

export function expectLanguageSchema(data: any) {
	expect(data).to.be.an("object")
	expect(data).to.have.keys("id", "name")
}
