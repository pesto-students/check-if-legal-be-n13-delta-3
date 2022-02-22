import { randPhoneNumber, randStreetAddress } from "@ngneat/falso"
import { listCity } from "../src/services/city/listCity"
import { listLanguage } from "../src/services/language/listLanguage"
import { createLawyer } from "../src/services/lawyer/createLawyer"
import { createOffering } from "../src/services/offering/createOffering"
import { listPaperType } from "../src/services/paperType/listPaperType"
import { createUser } from "../src/services/user/createUser"

export async function seedVerifiedLawyersAndOfferings() {
	const cityList = await listCity()
	const languageList = await listLanguage()
	const paperTypeList = await listPaperType()

	const lawyers = [
		{
			name: "Jagdish Tyagi",
			cityName: "Delhi",
			description:
				"Senior-level lawyer with vast expertise, overseeing high-level operations while mentoring junior legal staff and advising executive or C-suite employees.",
			offerings: [
				{
					paperTypeName: "Property Paper",
					languageName: "English",
					price: 10000,
				},
				{
					paperTypeName: "Property Paper",
					languageName: "Hindi",
					price: 10000,
				},
				{
					paperTypeName: "Contract Agreement",
					languageName: "English",
					price: 8000,
				},
				{
					paperTypeName: "Contract Agreement",
					languageName: "Hindi",
					price: 8000,
				},
			],
		},
		{
			name: "Jagdish Mishra",
			cityName: "Delhi",
			description:
				"Senior-level lawyer with vast expertise, overseeing high-level operations while mentoring junior legal staff and advising executive or C-suite employees.",
			offerings: [
				{
					paperTypeName: "Property Paper",
					languageName: "English",
					price: 9000,
				},
				{
					paperTypeName: "Property Paper",
					languageName: "Hindi",
					price: 9000,
				},
				{
					paperTypeName: "Deed",
					languageName: "English",
					price: 5000,
				},
				{
					paperTypeName: "Deed",
					languageName: "Hindi",
					price: 5000,
				},
			],
		},
		{
			name: "KD Pathak",
			cityName: "Mumbai",
			description:
				"Senior-level lawyer with vast expertise, overseeing high-level operations while mentoring junior legal staff and advising executive or C-suite employees.",
			offerings: [
				{
					paperTypeName: "Property Paper",
					languageName: "English",
					price: 12000,
				},
				{
					paperTypeName: "Property Paper",
					languageName: "Marathi",
					price: 12000,
				},
				{
					paperTypeName: "Deed",
					languageName: "English",
					price: 7000,
				},
				{
					paperTypeName: "Deed",
					languageName: "Marathi",
					price: 7000,
				},
				{
					paperTypeName: "Contract Agreement",
					languageName: "English",
					price: 9000,
				},
			],
		},
		{
			name: "Yash Mohal Jaiswal",
			cityName: "Mumbai",
			description:
				"Senior-level lawyer with vast expertise, overseeing high-level operations while mentoring junior legal staff and advising executive or C-suite employees.",
			offerings: [
				{
					paperTypeName: "Deed",
					languageName: "English",
					price: 7000,
				},
				{
					paperTypeName: "Deed",
					languageName: "Marathi",
					price: 7000,
				},
				{
					paperTypeName: "Contract Agreement",
					languageName: "English",
					price: 9000,
				},
				{
					paperTypeName: "Contract Agreement",
					languageName: "Marathi",
					price: 9000,
				},
			],
		},
	]

	for (const { name, cityName, offerings, description } of lawyers) {
		const city = cityList.find((city) => city.name === cityName)
		if (!city) throw new Error(`${cityName} city not found`)

		const user = await createUser({ name, isLawyer: true })
		const address = randStreetAddress({ length: 1 })[0]
		const phone = randPhoneNumber({ length: 1 })[0]

		const lawyer = await createLawyer({
			name,
			address,
			cityId: city.id,
			phone,
			userId: user.id,
			description,
			isVerified: true,
		})

		for (const { languageName, paperTypeName, price } of offerings) {
			const language = languageList.find((el) => el.name === languageName)
			if (!language) throw new Error(`${language} language not found`)

			const paperType = paperTypeList.find((el) => el.name === paperTypeName)
			if (!paperType) throw new Error(`${paperType} not found`)

			await createOffering({
				lawyerId: lawyer.id,
				expectedTimeInHours: 72,
				languageId: language.id,
				paperTypeId: paperType.id,
				price,
			})
		}
	}
}
