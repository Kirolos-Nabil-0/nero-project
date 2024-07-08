import { defineStore } from "pinia";

const URI = `http://localhost:5000/api/stores/`;

export const useProducts = defineStore("products", () => {
  const products = ref([]);
  const fetchProducts = async () => {
    // use the UseFetch composable to fetch the data
    const { data, error } = await useFetch(URI);
    if (error.value) {
      console.error(error.value);
      return;
    }

    watch(data.pending, (value) => {
      if (!value) {
        products.value = data.value;
      }
    });
    return data.value;
  };
  return {
    products,
    fetchProducts,
  };
});
