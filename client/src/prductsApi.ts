import axios from "axios";
import { ProductForm } from "./types";

const baseURL = import.meta.env.VITE_API;

// Function to create axios instance with a token
const createAxiosInstance = (token: string) => {
  return axios.create({
    baseURL: baseURL,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const addProduct = async (product: ProductForm, token: string) => {
  const instance = createAxiosInstance(token);
  try {
    const response = await instance.post(`/stores`, product);
    return response.data;
  } catch (error) {
    console.error("Error adding product:", error);
    throw error; // Re-throw the error to handle it further up the chain if necessary
  }
};

export const deleteProductApi = async (id: string, token: string) => {
  const instance = createAxiosInstance(token);
  try {
    const response = await instance.delete(`/stores/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error; // Re-throw the error to handle it further up the chain if necessary
  }
};

export const updateProduct = async (
  id: string,
  product: ProductForm,
  token: string
) => {
  const instance = createAxiosInstance(token);
  try {
    const response = await instance.patch(`/stores/${id}`, product);
    return response.data;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error; // Re-throw the error to handle it further up the chain if necessary
  }
};
