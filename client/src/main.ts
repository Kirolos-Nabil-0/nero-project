/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App
 */

import { createApp, computed } from "vue";
import App from "./App.vue";
import { registerPlugins } from "@/plugins";
import { useProductsStore } from "./stores/products";
import { useUserStore } from "./stores/user";
import db from "./db";
import { useLocalStorage } from "@vueuse/core";
import _ from "lodash"; // Import Lodash

// Initialize the Vue application
const app = createApp(App);

// Register Vue plugins
registerPlugins(app);

// Initialize the Web Worker
const webWorker = new Worker("/worker.js", { type: "module" });

// Initialize the user store and products store
const userStore = useUserStore();
const productsStore = useProductsStore();

// Define a reactive reference to the user's token
export const userToken = computed(() => userStore.user?.token ?? "");

console.log(userToken.value, "userToken.value");

// Set up the Web Worker message handler
webWorker.onmessage = async (event) => {
  const { msg, data } = event.data;

  if (msg === "productsData") {
    // Persist the data in the indexedDB
    await db.products.clear();
    await db.products.bulkPut(data);

    // Update the products store with new data
    const productsData = new Set(await db.products.toArray());
    productsStore.setProducts(productsData);
    console.log("Data stored in state");
  }
};

// Define fetch interval (15 seconds)
const FETCH_INTERVAL = 15000;

// Send the initial message to the Web Worker to fetch products data
if (userToken.value) {
  webWorker.postMessage({ msg: "fetchProductsData", token: userToken.value });
}

// Set an interval to fetch data periodically
let counter = 0;
const intervalId = setInterval(() => {
  console.log(userToken.value);
  if (!userToken.value) {
    return;
  }
  webWorker.postMessage({ msg: "fetchProductsData", token: userToken.value });

  // Increase the counter and optionally set a limit to stop the interval
  counter++;
  if (counter >= Infinity) {
    clearInterval(intervalId);
  }
}, FETCH_INTERVAL);

// Mount the Vue application
app.mount("#app");

async function initializeData() {
  // Use VueUse's useLocalStorage to track if it's the user's first visit
  const isFirstTime = useLocalStorage("isFirstTime", "true");

  // Fetch data from the indexedDB
  const productsData = await db.products.toArray();

  // If there is data in the indexedDB, update the products store
  if (productsData.length > 0) {
    productsStore.setProducts(new Set(productsData));
  } else {
    if (userToken.value) {
      webWorker.postMessage({
        msg: "fetchProductsData",
        token: userToken.value,
      });
    }

    if (isFirstTime.value === "true") {
      isFirstTime.value = "false";
      console.log("First time");
    }
  }
}

// Initialize the data
initializeData();
