import { expect } from "chai"

export function expectPaperTypeSchema(data: any) {
	expect(data).to.be.an("object")
	expect(data).to.have.keys("id", "name", "isSuspended")
}
