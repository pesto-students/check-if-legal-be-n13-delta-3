
export const UpdateLawyer = {
	tags: ["Lawyer"],
	description: "Update Lawyer But Need Verified Lawyer",
	operationId: "updateLawyer",
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
							example: "John Sai",
						},
						cityId: {
							type: "number",
							example: 11,
						},
						address: {
							type: "string",
							example: "Hyd",
						},
						description: {
							type: "string",
							example: "Intrested in using Exp",
						},
						phone: {
							type: "number",
							example: 8088989,
						},
					},
				},
			},
		},
		required: true,
	},
	responses: {
		"200": {
			description: "Lawyer Update successfully!",
			content: {
				"application/json": {
					schema: {
						type: "object",
						properties: {
							id: {
								type: "number",
								example: 1,
								description: "lawyer Id",
							},
						},
					},
				},
			},
		},
	},
}
