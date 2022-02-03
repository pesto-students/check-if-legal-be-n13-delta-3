import _ from "lodash"
import { UnprocessableEntityError } from "../../core/http"
import { IRazorpayOrderEntity } from "./IRazorpayOrderEntity"
import instance from "./razorpayInstance"

export async function createRazorpayOrder({
	amountInPaisa,
	receipt,
}: {
	amountInPaisa: number
	receipt: string
}): Promise<IRazorpayOrderEntity> {
	return new Promise((resolve, reject) => {
		instance.orders.create(
			{ amount: _.round(amountInPaisa), currency: "INR", receipt },
			(err: any, order: IRazorpayOrderEntity | null) => {
				if (err) {
					console.log(err)
					reject(new Error("Unable to connect to payment gateway provider"))
				} else if (!order) {
					reject(
						new UnprocessableEntityError(
							"Unable to create payment order request",
						),
					)
				} else {
					resolve(order)
				}
			},
		)
	})
}
