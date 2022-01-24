import { z } from "zod"
import { BadRequestError } from "./http"

export async function parseSchema<T extends unknown>(
	schema: z.Schema<T>,
	data: unknown,
): Promise<T> {
	try {
		return await schema.parseAsync(data)
	} catch (err) {
		if (err instanceof z.ZodError) throw new BadRequestError(err.message, err.stack)
		throw err
	}
}
