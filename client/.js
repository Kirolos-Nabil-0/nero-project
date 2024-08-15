const API_URL = `http://localhost:5000/api/stores`;
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmJhYmI1NGMzZjUxZWJjYzlkNTY5OTEiLCJpYXQiOjE3MjM1NDYyODB9.wTFcKfKxLQ6R_rPPV_6xB2ew7lleHeTzGvwrBXt0P7g";

class Product {
  constructor(name, amount, buyPrice, sellPrice) {
    this.name = name;
    this.amount = amount;
    this.buyPrice = buyPrice;
    this.sellPrice = sellPrice;
  }
}

function RandomizeProduct() {
  const name = "Product" + Math.floor(Math.random() * 100000000000);
  const amount = Math.floor(Math.random() * 1000);
  const buyPrice = Math.floor(Math.random() * 1000);
  const sellPrice = Math.floor(Math.random() * 1000);
  return new Product(name, amount, buyPrice, sellPrice);
}

function RandomizeProducts(count) {
  const products = [];
  for (let i = 0; i < count; i++) {
    products.push(RandomizeProduct());
  }
  return products;
}

async function CreateProduct(product) {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(product),
    });
    const data = await response.json();
    console.log("Success:", data);
  } catch (error) {
    console.error("Error:", error);
  }
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function CreateProducts(products) {
  for (const product of products) {
    await CreateProduct(product); // Ensures each request is fully done before the next starts
    // await delay(0); // Introduces a 1-second delay between requests
  }
}

(async function () {
  const products = RandomizeProducts(10000);
  await CreateProducts(products);
  console.log("Done");
})();
