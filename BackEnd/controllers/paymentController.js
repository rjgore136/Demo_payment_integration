import razorpay from "razorpay";
import dotenv from "dotenv";
import crypto from "crypto";
import { paymentModel } from "../models/paymentModel.js";
dotenv.config();

const instance = new razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SERCRET,
});

//checkout
const checkOut = async (req, res) => {
  const options = {
    amount: Number(req.body.amount) * 100,
    currency: "INR",
  };
  const order = await instance.orders.create(options);
  res.json({ success: true, order });
};

//payment verification
const paymentVerification = async (req, res) => {
  // console.log(req.body);
  const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
    req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_API_SERCRET)
    .update(body.toString())
    .digest("hex");

  const isAunthentic = expectedSignature === razorpay_signature;
  if (isAunthentic) {
    await paymentModel.create({
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
    });

    res.redirect(
      `http://localhost:5173/paymentsuccess?reference=${razorpay_payment_id}`
    );
  } else {
    res.json({ success: false, message: "Something went wrong!!" });
  }
};

export { checkOut, paymentVerification };
