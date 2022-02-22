export const getCities = {
	tags: ["City"],
	description: "ListCity",
	operationId: "getCities",
	security: [
		{
			jwt: [],
		},
	],
	responses: {
		"200": {
			description: "City retrieved successfully!",
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
