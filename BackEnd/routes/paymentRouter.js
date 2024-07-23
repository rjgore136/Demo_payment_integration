import express from "express";
import { checkOut, paymentVerification } from "../controllers/paymentController.js";

const paymentRouter = express.Router();

paymentRouter.post("/checkout",checkOut);
paymentRouter.post("/paymentverification",paymentVerification);

export default paymentRouter;  