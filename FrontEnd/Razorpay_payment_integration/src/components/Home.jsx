import React from "react";
import axios from "axios";
import { Box, Stack } from "@chakra-ui/react";
import Card from "./Card";
const Home = () => {
  const checkoutHandler = async (amount) => {
    const {
      data: { key },
    } = await axios.get("http://localhost:4000/api/getKey");

    const {
      data: { order },
    } = await axios.post("http://localhost:4000/api/checkout", {
      amount,
    });
    // console.log(data);
    const options = {
      key: key,
      amount: amount,
      currency: "INR",
      name: "Ritesh Gore",
      description: "Razorpay payment integration",
      image:
        "https://images.unsplash.com/photo-1457449940276-e8deed18bfff?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D",
      order_id: order.id,
      callback_url: "http://localhost:4000/api/paymentverification",
      prefill: {
        name: "Ritesh Gore",
        email: "ritesh.gore@example.com",
        contact: "9000090000",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };
  return (
    <>
      <Box>
        <Stack
          h={"100vh"}
          alignItems="center"
          justifyContent="center"
          direction={["column", "row"]}
        >
          <Card
            amount={5000}
            img={
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAfmhyAXuG3saxtItMSWymcfae2tISjSWZXJDAwe1ZMceMiTusAzn5knV1o-j9UKLgcn0&usqp=CAU"
            }
            checkoutHandler={checkoutHandler}
          />
          <Card
            amount={3000}
            img={
              "http://i1.adis.ws/i/canon/eos-r5_front_rf24-105mmf4lisusm_32c26ad194234d42b3cd9e582a21c99b"
            }
            checkoutHandler={checkoutHandler}
          />
        </Stack>
      </Box>
    </>
  );
};

export default Home;
