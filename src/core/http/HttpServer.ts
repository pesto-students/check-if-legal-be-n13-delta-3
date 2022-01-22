import express, { Express, RequestHandler } from "express"
import { HttpApi } from "./HttpApi"

export class HttpServer {
	server: Express
	port: number

	constructor(port: number) {
		this.server = express()
		this.port = port
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

	api(...httpApis: HttpApi[]) {
		httpApis.forEach((api) => {
			const handlers = [...api.middlewares, api.callApi]
			this.server[api.method](api.endpoint, ...handlers)
		})
	}
}