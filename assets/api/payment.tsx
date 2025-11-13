import { getApiBaseUrl } from "@/scripts/config";
import axios from "axios";

export const createBankPayment = async (bank: string, products: any[], customer: any) => {
  const baseUrl = await getApiBaseUrl();
  const res = await axios.post(`${baseUrl}/create-payment-bank`, {
    bank,
    products,
    customer_details: customer,
  });
  return res.data;
};

export const createQrisPayment = async (orderId: string, grossAmount: number) => {
  const baseUrl = await getApiBaseUrl();
  const res = await axios.post(`${baseUrl}/create-payment-qris`, {
    order_id: orderId,
    gross_amount: grossAmount,
    payment_type: "gopay",
  });
  return res.data;
};

export const createSnapTransaction = async (orderId: string, grossAmount: number, customer: any) => {
  const baseUrl = await getApiBaseUrl();
  const res = await axios.post(`${baseUrl}/midtrans-sandbox`, {
    order_id: orderId,
    gross_amount: grossAmount,
    customer,
  });
  return res.data;
};
