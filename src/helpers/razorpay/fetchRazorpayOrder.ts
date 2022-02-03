import { UnprocessableEntityError } from "../../core/http"
import { IRazorpayOrderEntity } from "./IRazorpayOrderEntity"
import instance from "./razorpayInstance"

export async function fetchRazorpayOrder({
	orderId,
}: {
	orderId: string
}): Promise<IRazorpayOrderEntity> {
	return new Promise((resolve, reject) => {
		instance.orders.fetch(orderId, (err: any, order: IRazorpayOrderEntity | null) => {
			if (err) {
				console.log(err)
				reject(new Error("Unable to connect to payment gateway provider"))
			} else if (!order) {
				reject(new UnprocessableEntityError("Invalid Payment Order"))
			} else {
				resolve(order)
			}
		})
	})
}
