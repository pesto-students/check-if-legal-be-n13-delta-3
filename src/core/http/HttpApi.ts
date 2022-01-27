import { Request, RequestHandler, Response } from "express"
import { z } from "zod"
import { BadRequestError } from "."
import configs from "../configs"
import { HttpMethod, HttpStatusCode } from "./enums"
import { HttpError, isHttpError } from "./HttpError"
import { HttpResponse } from "./HttpResponse"
import expressFormData from "express-form-data"
import { F, FileObject } from "./multipart"
import _ from "lodash"

type IHandler<BodySchemaType, QuerySchemaType, ParamsSchemaType> = (payload: {
	req: Request
	body: BodySchemaType
	query: QuerySchemaType
	params: ParamsSchemaType
	files: unknown
}) => Promise<HttpResponse | any>
interface IHttpApiConstructorParameters<
	BodySchemaType extends unknown,
	QuerySchemaType extends unknown,
	ParamsSchemaType extends unknown,
> {
	method: HttpMethod
	endpoint: string
	bodySchema?: z.Schema<BodySchemaType>
	querySchema?: z.Schema<QuerySchemaType>
	paramsSchema?: z.Schema<ParamsSchemaType>
	filesSchema?: FileObject
	acceptMultipartFormData?: boolean
	options?: IOptions
	middlewares?: RequestHandler[]
	handler: IHandler<BodySchemaType, QuerySchemaType, ParamsSchemaType>
}

interface IOptions {
	hideErrorStack?: boolean
	formData?: { autoClean?: boolean; maxFilesSize?: number; uploadDir?: string }
}

export class HttpApi<
	BodySchemaType extends unknown,
	QuerySchemaType extends unknown,
	ParamsSchemaType extends unknown,
> {
	method: HttpMethod
	endpoint: string
	bodySchema: z.Schema<BodySchemaType>
	querySchema: z.Schema<QuerySchemaType>
	paramsSchema: z.Schema<ParamsSchemaType>
	filesSchema?: FileObject
	acceptMultipartFormData: boolean
	options: IOptions
	middlewares: RequestHandler[]
	handler: IHandler<BodySchemaType, QuerySchemaType, ParamsSchemaType>

	callApi: RequestHandler

	constructor(
		payload: IHttpApiConstructorParameters<
			BodySchemaType,
			QuerySchemaType,
			ParamsSchemaType
		>,
	) {
		this.method = payload.method
		this.endpoint = payload.endpoint
		// @ts-ignore
		this.bodySchema = payload.bodySchema ?? z.object({}).strict()
		// @ts-ignore
		this.querySchema = payload.querySchema ?? z.object({}).strict()
		// @ts-ignore
		this.paramsSchema = payload.paramsSchema ?? z.object({}).strict()

		this.acceptMultipartFormData = payload.acceptMultipartFormData ?? false
		if (this.acceptMultipartFormData && payload.filesSchema) {
			this.filesSchema = payload.filesSchema ?? F.object({})
		}

		const defaultOptions: IOptions = {
			hideErrorStack: configs.server.environment === "production",
		}
		this.options = payload.options ?? defaultOptions
		this.handler = payload.handler

		this.middlewares = []
		if (this.acceptMultipartFormData) {
			const formDataOptions = this.options.formData ?? {}
			this.middlewares.push(expressFormData.parse(formDataOptions))
		}
		if (payload.middlewares) {
			this.middlewares.push(...payload.middlewares)
		}

		this.callApi = async (req, res) => {
			try {
				if (res.headersSent) return

				let files: any = undefined
				if (this.acceptMultipartFormData) {
					if (this.filesSchema) {
						// @ts-ignore
						files = this.filesSchema.parse(req.files)
					} else {
						// @ts-ignore
						files = req.files
					}
				}

				try {
					const [body, query, params] = await Promise.all([
						this.bodySchema.parseAsync(req.body),
						this.querySchema.parseAsync(req.query),
						this.paramsSchema.parseAsync(req.params),
					])
					const responseObject = await this.handler({
						req,
						body,
						query,
						params,
						files,
					})
					sendJsonResponse(res, responseObject)
				} catch (err) {
					if (err instanceof z.ZodError) {
						throw new BadRequestError(err.message, err.stack)
					}
					throw err
				}
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
