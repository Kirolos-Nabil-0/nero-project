console.log("Worker is running");

let db;
let idxData = [];

// Function to open the database and retrieve the data
function openDatabaseAndGetData() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("ProductDB", 110);

    request.onsuccess = (event) => {
      db = event.target.result;
      // console.log("Database opened successfully");

      const objectStore = db.transaction("products").objectStore("products");
      const data = [];

      objectStore.openCursor().onsuccess = (event) => {
        const cursor = event.target.result;
        if (cursor) {
          data.push(cursor.value);
          cursor.continue();
        } else {
          // console.log("No more entries");
          resolve(data);
        }
      };

      objectStore.openCursor().onerror = () => {
        reject("Error reading data from IndexedDB");
      };
    };

    request.onerror = (event) => {
      console.log("Error opening database");
      console.log(event.target.error);
      reject(event.target.error);
    };
  });
}

// Function to deeply compare two objects or arrays
function deepEqual(a, b) {
  return JSON.stringify(a) === JSON.stringify(b); // Simplified deep comparison
}

// Listen for messages from the main thread
self.addEventListener("message", async (event) => {
  if (event.data.msg === "fetchProductsData" && event.data.token !== "") {
    try {
      // Open the database and retrieve the stored data
      idxData = await openDatabaseAndGetData();

      // Fetch new data from the server
      const res = await fetch("http://localhost:5000/api/stores", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${event.data.token}`,
        },
      });

      const data = await res.json();

      // Compare fetched data with the data in the IndexedDB
      const isDataChanged = !deepEqual(data, idxData);
      console.log("Data changed:", isDataChanged);

      if (isDataChanged) {
        // Send the updated products data back to the main thread
        self.postMessage({ msg: "productsData", data });
      } else {
        // console.log("Data has not changed");
      }
    } catch (error) {
      console.error("Failed to fetch products data or access IndexedDB", error);
    }
  }
});
