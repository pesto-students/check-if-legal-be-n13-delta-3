export const updatePaperType= {
	tags: ["Paper"],
	description: "Can Update the Paper Type",
	operationId: "updatePaperType",
	security: [
		{
			jwt: [],
		},
	],
	parameters: [
		{
			name: "paperId",
			in: "path",
			description: "paperId",
			required: true,
			type: "string",
			example: 1,
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
							example: "loan",
						},
					},
				},
			},
		},
		required: true,
	},
	responses: {
		"200": {
			description: "Paper Updated successfully!",
			content: {
				"application/json": {
					schema: {
						type: "object",
						properties: {
							id: {
								type: "number",
								example: 22,
							},
						},
					},
				},
			},
		},
	},
}
