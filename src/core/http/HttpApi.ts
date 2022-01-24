import { Request, RequestHandler, Response } from "express"
import { z } from "zod"
import configs from "../configs"
import { HttpMethod, HttpStatusCode } from "./enums"
import { HttpError, isHttpError } from "./HttpError"
import { HttpResponse } from "./HttpResponse"

type IHandler<T> = (payload: { req: Request; body: T }) => Promise<HttpResponse | any>
interface IHttpApiConstructorParameters<T extends unknown> {
	method: HttpMethod
	endpoint: string
	bodySchema?: z.Schema<T>
	options?: IOptions
	middlewares?: RequestHandler[]
	handler: IHandler<T>
}

interface IOptions {
	hideErrorStack?: boolean
	formData?: { autoClean?: boolean; maxFilesSize?: number; uploadDir?: string }
}

export class HttpApi<T extends unknown = unknown> {
	method: HttpMethod
	endpoint: string
	bodySchema: z.Schema<T>
	options: IOptions
	middlewares: RequestHandler[]
	handler: IHandler<T>

	callApi: RequestHandler

	constructor(payload: IHttpApiConstructorParameters<T>) {
		this.method = payload.method
		this.endpoint = payload.endpoint
		// @ts-ignore
		this.bodySchema = payload.bodySchema ?? z.object({}).strict()

		const defaultOptions: IOptions = {
			hideErrorStack: configs.server.environment === "production",
		}

		this.options = payload.options ?? defaultOptions
		this.handler = payload.handler
		this.middlewares = payload.middlewares ?? []

		this.callApi = async (req, res) => {
			try {
				if (res.headersSent) return
				const body = await this.bodySchema.parseAsync(req.body)
				const responseObject = await this.handler({ req, body })
				sendJsonResponse(res, responseObject)
			} catch (err) {
				sendErrorResponse(res, err)
			}
		}
	}
}

function sendJsonResponse(res: Response, responseObject: HttpResponse | any) {
	let data = undefined
	let statusCode = HttpStatusCode.NO_CONTENT

	if (responseObject instanceof HttpResponse) {
		statusCode = responseObject.httpStatusCode
		data = responseObject.data
	} else {
		data = responseObject
		statusCode = data ? HttpStatusCode.OK : HttpStatusCode.NO_CONTENT
	}

	res.status(statusCode).json(data)
}

function sendErrorResponse(
	res: Response,
	err: unknown,
	options: { hideErrorStack?: boolean } = {},
) {
	let data: { name: string; message: string; stack?: string } = {
		name: "InternalServerError",
		message: "Something went wrong",
	}
	let statusCode = HttpStatusCode.INTERNAL_SERVER_ERROR

	if (isHttpError(err)) {
		const httpError = err as HttpError

		statusCode = httpError.httpStatusCode
		data = {
			name: httpError.name,
			message: httpError.message,
			stack: (!options.hideErrorStack && httpError.stack) || undefined,
		}
	} else if (err instanceof Error) {
		data = {
			name: err.name,
			message: err.message,
			stack: (!options.hideErrorStack && err.stack) || undefined,
		}
	}

	res.status(statusCode).json(data)
}
