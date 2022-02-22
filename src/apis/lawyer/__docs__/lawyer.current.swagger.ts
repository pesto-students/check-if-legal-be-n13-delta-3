export const getCurrentLawyer = {
	tags: ["Lawyer"],
	description: "Get Lawyer Details",
	operationId: "getLawyer",
	security: [
		{
			jwt: [],
		},
	],
	responses: {
		"200": {
			description: "Lawyer retrieved successfully!",
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
