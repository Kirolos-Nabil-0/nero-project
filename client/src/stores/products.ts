// Utilities
import { defineStore } from "pinia";
import { Product } from "../types";
import { deleteProductApi } from "@/prductsApi";
import { userToken } from "@/main";
import _ from "lodash"; // Import Lodash

export const useProductsStore = defineStore("products", () => {
  const products = ref<Set<Product>>(new Set<Product>());

  // actions
  function setProducts(newProducts: Set<Product>) {
    products.value = newProducts;
  }

  function addProduct(newProduct: Product) {
    products.value.add(newProduct);
  }

  async function removeProduct(id: string) {
    const res = await deleteProductApi(id, userToken.value);

    if (!res) {
      return;
    }

    // Remove the product from the store
    products.value = new Set(
      _.filter(Array.from(products.value), (product) => product._id !== id)
    );
  }

  function updateProduct(updatedProduct: Product) {
    products.value = new Set(
      _.map(Array.from(products.value), (product) =>
        product._id === updatedProduct._id ? updatedProduct : product
      )
    );
  }

  return {
    products,
    setProducts,
    addProduct,
    removeProduct,
    updateProduct,
  };
});
