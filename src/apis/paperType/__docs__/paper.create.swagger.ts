export const createPaperType = {
	tags: ["Paper"],
	description: "Can Create Paper Type",
	operationId: "createPaper",
	security: [
		{
			jwt: [],
		},
	],
	requestBody: {
		content: {
			"application/json": {
				schema: {
					type: "object",
					properties: {
						name: {
							type: "string",
							example: "land",
						},
					},
				},
			},
		},
		required: true,
	},
	responses: {
		"200": {
			description: "Paper created successfully!",
			content: {
				"application/json": {
					schema: {
						type: "object",
						properties: {
							id: {
								type: "number",
								example: 0,
							},
						},
					},
				},
			},
		},
	},
}
