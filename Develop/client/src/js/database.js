// Import the openDB function from the "idb" module
import { openDB } from "idb";

// Async function to initialize the database
const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

// Async function to add data to the "jate" object store in the database
export const putDb = async (content) => {
  const db = await openDB("jate", 1);
  const tx = db.transaction("jate", "readwrite");
  const store = tx.objectStore("jate");
  await store.put({ content });
  await tx.complete;
};

// Async function to retrieve data from the "jate" object store in the database
export const getDb = async () => {
  const db = await openDB("jate", 1);
  const tx = db.transaction("jate", "readonly");
  const store = tx.objectStore("jate");
  const data = await store.getAll();
  await tx.complete;
  return data.length ? data[data.length - 1].content : null;
};

// Call the initdb function to initialize the database when the module is imported
initdb();