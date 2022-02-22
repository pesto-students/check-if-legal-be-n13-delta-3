export const getCity = {
	tags: ["City"],
	description: "Can Create City",
	operationId: "createCity",
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
			description: "City created successfully!",
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
