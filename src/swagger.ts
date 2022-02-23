import { getCity } from "./apis/city/__swagger__/city.swagger"
import { deleteCity } from "./apis/city/__swagger__/delete.city.swagger"
import { getCities } from "./apis/city/__swagger__/list.cities.swagger"
import { updateCity } from "./apis/city/__swagger__/update.city.swagger"
import { getCurrentLawyer } from "./apis/lawyer/__docs__/lawyer.current.swagger"
import { CreateLawyer } from "./apis/lawyer/__docs__/lawyer.swagger.register"
import { UpdateLawyer } from "./apis/lawyer/__docs__/lawyer.update.swagger"
import { createPaperType } from "./apis/paperType/__docs__/paper.create.swagger"
import { deletePaperType } from "./apis/paperType/__docs__/paper.delete.swagger"
import { getPapers } from "./apis/paperType/__docs__/paper.get.swagger"
import { updatePaperType } from "./apis/paperType/__docs__/paper.update.swagger"

export const swaggerDocument = {
	openapi: "3.0.0",
	info: {
		version: "1.0.0",
		title: "APIs Document",
		description: "your description here",
		termsOfService: "",
		contact: {
			name: "Saitharun",
			email: "janagamsaitarun@gmail.com",
			url: "https://checkiflegal.in",
		},
		license: {
			name: "Apache 2.0",
			url: "https://www.apache.org/licenses/LICENSE-2.0.html",
		},
	},
	components: {
		securitySchemes: {
			jwt: {
				type: "http",
				scheme: "bearer",
				in: "header",
				bearerFormat: "JWT",
			},
		},
	},
	security: [
		{
			jwt: [],
		},
	],
	paths: {
		"/lawyer/register": {
			post: CreateLawyer,
		},
		"/lawyer/self": {
			get: getCurrentLawyer,
			patch: UpdateLawyer,
		},
		"/city": {
			get: getCities,
			post: getCity,
		},
		"/city/{id}": {
			patch: updateCity,
			delete: deleteCity,
		},
		"/paper": {
			get: getPapers,
			post: createPaperType,
		},
		"/paper/{id}": {
			delete: deletePaperType,
			patch: updatePaperType,
		},
	},
}
