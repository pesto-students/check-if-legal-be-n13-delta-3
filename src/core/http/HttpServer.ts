import express, { Express, RequestHandler } from "express"
import swaggerUi from "swagger-ui-express"
import * as Sentry from "@sentry/node"
import * as Tracing from "@sentry/tracing"
import { HttpApi } from "./HttpApi"
import { swaggerDocument } from "../../swagger"

export class HttpServer {
	server: Express
	port: number

	constructor(port: number) {
		this.server = express()
		this.port = port
		if (process.env.NODE_ENV !== "development") {
			console.log('--process.env.NODE_ENV',process.env.NODE_ENV)
			Sentry.init({
				dsn: "https://2429f4f1273947d0b2c30abfaec8981a@o952669.ingest.sentry.io/6233609",
				integrations: [
					new Sentry.Integrations.Http({ tracing: true }),
					new Tracing.Integrations.Express({ app: this.server }),
				],
				tracesSampleRate: 1.0,
			})
		}
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
		this.server.use(Sentry.Handlers.requestHandler())
		// TracingHandler creates a trace for every incoming request
		this.server.use(Sentry.Handlers.tracingHandler())
		httpApis.forEach((api) => {
			const handlers = [...api.middlewares, api.callApi]
			this.server[api.method](api.endpoint, ...handlers)
		})
		this.server.use(Sentry.Handlers.errorHandler())
	}
}
