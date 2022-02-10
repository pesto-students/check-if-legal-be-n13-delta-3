import { expect } from "chai"
import { expectStateSchema } from "./state"

export function expectCitySchema(data: any) {
	expect(data).to.be.an("object")
	expect(data).to.have.keys("id", "name", "stateId", "state")
	expectStateSchema(data.state)
}
