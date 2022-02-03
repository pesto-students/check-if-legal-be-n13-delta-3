import chai from "chai"
import chaiHttp from "chai-http"
import chaiThings from "chai-things"
import httpServer from "../server"

chai.use(chaiHttp)
chai.use(chaiThings)
export let requester: ChaiHttp.Agent

before(() => {
	requester = chai.request(httpServer.server).keepOpen()
	console.log("http requester opened")
})

after(() => {
	requester.close()
	console.log("http requester closed")
})
