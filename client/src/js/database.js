import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  const db = await openDB('jate', 1);
  const tx = db.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  const request = await store.put({ id: 1, value: content });
  await tx.done;
  // Get confirmation of the request.
  const result = await request;
  console.log('Data saved to the database', result);
}

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  const db = await openDB('jate', 1); // Open the database
  const tx = db.transaction('jate', 'readonly'); // Start a transaction
  const store = tx.objectStore('jate'); // Get the object store
  const request = await store.getAll(); // Get all the data from the object store
  await tx.done; // Close the transaction
  // Get confirmation of the request.
  const result = await request;
  console.log('Data retrieved from the database', result);
  return result;
}

initdb();
