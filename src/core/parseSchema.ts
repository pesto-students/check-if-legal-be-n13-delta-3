import { z } from "zod"
import { BadRequestError } from "./http"

export async function parseSchema<T extends unknown>(
	schema: z.Schema<T>,
	data: unknown,
): Promise<T> {
	try {
		const parsed = await schema.parseAsync(data)
		return parsed
	} catch (err) {
		if (err instanceof z.ZodError) {
			throw new BadRequestError(err.message, err.stack)
		}
		throw err
	}
}
