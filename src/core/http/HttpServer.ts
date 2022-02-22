import express, { Express, RequestHandler } from "express"
import { HttpApi } from "./HttpApi"
import swaggerUi from "swagger-ui-express"
import { swaggerDocument } from "../../swagger"

export class HttpServer {
	server: Express
	port: number

	constructor(port: number) {
		this.server = express()
		this.port = port
		this.server.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))
	}

	listen(): Promise<number> {
		return new Promise((resolve) => {
			this.server.listen(this.port, () => resolve(this.port))
		})
	}

	use(...middlewares: RequestHandler[]) {
		middlewares.forEach((el) => {
			this.server.use(el)
		})
	}

	route(path: string, ...middlewares: RequestHandler[]): void {
		this.server.use(path, ...middlewares)
	}

	api(...httpApis: HttpApi<any, any, any>[]) {
		httpApis.forEach((api) => {
			const handlers = [...api.middlewares, api.callApi]
			this.server[api.method](api.endpoint, ...handlers)
		})
	}
}
