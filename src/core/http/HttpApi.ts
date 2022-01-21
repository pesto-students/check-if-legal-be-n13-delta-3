import { Request, RequestHandler, Response } from "express"
import configs from "../configs"
import { HttpMethod, HttpStatusCode } from "./enums"
import { HttpError, isHttpError } from "./HttpError"
import { HttpResponse } from "./HttpResponse"

interface IHttpApiConstructorParameters {
	method: HttpMethod
	endpoint: string
	options?: IOptions
	middlewares?: RequestHandler[]
	handler: IHandler
}

type IHandler = (req: Request) => Promise<HttpResponse | any>

interface IOptions {
	hideErrorStack?: boolean
	formData?: {
		autoClean?: boolean
		maxFilesSize?: number
		uploadDir?: string
	}
}

export class HttpApi {
	method: HttpMethod
	endpoint: string
	options: IOptions
	middlewares: RequestHandler[]
	handler: IHandler

	callApi: RequestHandler

	constructor(payload: IHttpApiConstructorParameters) {
		this.method = payload.method
		this.endpoint = payload.endpoint

		const defaultOptions: IOptions = {
			hideErrorStack: configs.server.environment === "production",
		}

		this.options = payload.options ?? defaultOptions
		this.handler = payload.handler

		this.middlewares = payload.middlewares ?? []

		this.callApi = async (req, res) => {
			try {
				if (res.headersSent) return
				const responseObject = await this.handler(req)
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
	let data: { message: string; stack?: string } = {
		message: "Something went wrong",
	}
	let statusCode = HttpStatusCode.INTERNAL_SERVER_ERROR

	if (isHttpError(err)) {
		const httpError = err as HttpError

		statusCode = httpError.httpStatusCode
		data = {
			message: httpError.message,
			stack: (!options.hideErrorStack && httpError.stack) || undefined,
		}
	} else if (err instanceof Error) {
		data = data = {
			message: err.message,
			stack: (!options.hideErrorStack && err.stack) || undefined,
		}
	}

	res.status(statusCode).json(data)
}
