import Razorpay from "razorpay"
import configs from "../../core/configs"

if (!configs.razorpay.idKey || !configs.razorpay.secretKey) {
	throw new Error("Razorpay keys are not set")
}

const instance = new Razorpay({
	key_id: configs.razorpay.idKey,
	key_secret: configs.razorpay.secretKey,
})

export default instance
