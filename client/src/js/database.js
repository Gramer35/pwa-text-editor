import { openDB } from 'idb';

const initdb = async () =>
  openDB('text', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('text database already exists');
        return;
      }
      db.createObjectStore('text', { keyPath: 'id', autoIncrement: true });
      console.log('text database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('updating the database');

  // Creates a connection with db and what version it is
  const textDb = await openDB('text', 1);

  // This allows the program to write things in the DB
  const tx = textDb.transaction('text', 'readwrite');

  // open up the desired object store
  const store = tx.objectStore('text');

  const request = store.put({ id: 1, text: content });

  const result = await request;

};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('Obtained from database');

  const textDb = await openDB('text', 1);

  const tx = textDb.transaction('text', 'readonly');

  const store = tx.objectStore('text');

  const request = store.get(1);

  const result = await request;
  console.log('index', result);
  return result?.text;
};

initdb();
