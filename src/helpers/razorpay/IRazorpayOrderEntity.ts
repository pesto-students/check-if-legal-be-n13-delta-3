import { RazorpayOrderStatus } from "./RazorpayOrderStatus"

export interface IRazorpayOrderEntity {
	/**
	 * The unique identifier of the order.
	 */
	id: string

	/**
	 * The amount for which the order was created, in currency subunits.
	 * For example, for an amount of ₹295, enter 29500.
	 */
	amount: number

	/**
	 * Indicates whether the customer can make a partial payment.
	 */
	partial_payment?: boolean

	/**
	 * The amount paid against the order.
	 */
	amount_paid: number

	/**
	 * The amount pending against the order.
	 */
	amount_due: number

	/**
	 * The currency associated with the order's amount.
	 * The default length is 3 characters
	 */
	currency: string

	/**
	 * Receipt number that corresponds to this order.
	 * Can have a maximum length of 40 characters and has to be unique.
	 */
	receipt: string

	/**
	 * The status of the order
	 */
	status: RazorpayOrderStatus

	/**
	 * The number of payment attempts, successful and failed, that have been made against this order.
	 */
	attempts: number

	/**
	 * Key-value pair that can be used to store additional information about the entity.
	 * Maximum 15 key-value pairs, 256 characters (maximum) each
	 */
	notes: object

	/**
	 * Indicates the Unix timestamp when this order was created
	 */
	created_at: number
}
