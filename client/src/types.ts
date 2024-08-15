export type User = {
  _id: string;
  name: string;
  phone: string;
  token: string;
};

export type Product = {
  _id: string;
  name: string;
  amount: number;
  buyPrice: number;
  sellPrice: number;
  createdAt: string;
  updatedAt: string;
};
export type ProductForm = {
  name: string;
  amount: number;
  buyPrice: number;
  sellPrice: number;
};
