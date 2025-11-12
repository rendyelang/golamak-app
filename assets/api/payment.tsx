import axios from "axios";

const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

// 🏦 Create payment via bank transfer
export const createBankPayment = async (bank: string, products: any[], customer: any) => {
  const res = await axios.post(`${BASE_URL}/create-payment-bank`, {
    bank,
    products,
    customer_details: customer,
  });
  return res.data;
};

// 💸 Create payment via QRIS / GoPay
export const createQrisPayment = async (orderId: string, grossAmount: number) => {
  const res = await axios.post(`${BASE_URL}/create-payment-qris`, {
    order_id: orderId,
    gross_amount: grossAmount,
    payment_type: "gopay",
  });
  return res.data;
};

// 🧩 Create Midtrans Snap sandbox transaction
export const createSnapTransaction = async (orderId: string, grossAmount: number, customer: any) => {
  const res = await axios.post(`${BASE_URL}/midtrans-sandbox`, {
    order_id: orderId,
    gross_amount: grossAmount,
    customer,
  });
  return res.data; // { message, token, redirect_url }
};
