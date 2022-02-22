export const getPapers = {
    tags: ["Paper"],
	description: "ListPaperTypes",
	operationId: "getPapers",
	security: [
		{
			jwt: [],
		},
	],
	responses: {
		"200": {
			description: "paper retrieved successfully!",
			content: {
				"application/json": {
					schema: {
						type: "array",
						items: {
							type: "object",
						},
					},
				},
			},
		},
	},
}