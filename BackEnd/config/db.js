import mongoose from "mongoose";
const connectDB = async () => {
  await mongoose
    .connect(`${process.env.connString}`)
    .then(() => console.log("DB connnetion successfull!!"));
};

export {connectDB};
    