import express, { urlencoded } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import paymentRouter from "./routes/paymentRouter.js";

dotenv.config();

const app = express();
const port = process.env.PORT;


//middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());


//routers
app.use("/api",paymentRouter);


app.get("/api/getKey",(req,res)=>{
  res.json({key:process.env.RAZORPAY_API_KEY})
})

//db implementaion
try {
  connectDB();
  app.listen(port, (req, res) => {
    console.log(`Server is listening on http://localhost:${port}`);
  });
} catch (error) {
  console.log(error.message);
}
