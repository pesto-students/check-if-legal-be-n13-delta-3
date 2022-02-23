export const updateCity = {
	tags: ["City"],
	description: "Can Update City",
	operationId: "updateCity",
	security: [
		{
			jwt: [],
		},
	],
	parameters: [
		{
			name: "cityId",
			in: "path",
			description: "cityId",
			required: true,
			type: "string",
			example: 111,
		},
	],
	requestBody: {
		content: {
			"application/json": {
				schema: {
					type: "object",
					properties: {
						stateId: {
							type: "number",
							example: 2,
						},
						name: {
							type: "string",
							example: "Delhi",
						},
					},
				},
			},
		},
		required: true,
	},
	responses: {
		"200": {
			description: "City Updated successfully!",
			content: {
				"application/json": {
					schema: {
						type: "object",
						properties: {
							id: {
								type: "number",
								example: 2,
							},
						},
					},
				},
			},
		},
	},
}
