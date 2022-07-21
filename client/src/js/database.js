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
  console.log('Put in database');
  const editorDb = await openDB('J.A.T.E', 1);
  const task = editorDb.transaction('J.A.T.E', 'readWrite');
  const storage = task.objectStore('J.A.T.E');
  const storeRequest = storage.put({ id:1, value: content});
  const storeEnd = await storeRequest;
  console.log('Data Stored to Database',storeEnd.value);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('Get from Database');
  const editorDb = await openDB('J.A.T.E', 1);
  const task = editorDb.transaction('J.A.T.E', 'readonly');
  const storage = task.objectStore('J.A.T.E');
  const storeRequest = storage.get(1);
  const storeEnd = await storeRequest;
  storeEnd
  ? console.log('Data gathered from Database', storeEnd.value)
  : console.log('Error gathering data');
  return storeEnd?.value;
};

initdb();
