import Dexie, { Table } from "dexie";
import { Product } from "./types";

// Extend Dexie to include the products table
class ProductDB extends Dexie {
  products!: Table<Product, number>;

  constructor() {
    super("ProductDB");
    this.version(11).stores({
      products: "_id, name, amount, buyPrice, sellPrice, createdAt, updatedAt",
    });
  }
}

// Create an instance of the database
const db = new ProductDB();

export default db;
