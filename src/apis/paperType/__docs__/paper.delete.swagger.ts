export const deletePaperType = {
	tags: ["Paper"],
	description: "Can Delete paper",
	operationId: "deletePaper",
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
	responses: {
		"200": {
			description: "Delete Updated successfully!",
			content: {
				"application/json": {
					schema: {
						type: "object",
						properties: {
							id: {
								type: "string",
								example: 2,
							},
						},
					},
				},
			},
		},
	},
}
