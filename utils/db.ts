import { openDB, IDBPDatabase } from 'idb';
import { Contact } from '../types/contact';

const DB_NAME = 'contacts-store';
const STORE_NAME = 'contacts';

let dbPromise: Promise<IDBPDatabase> | null = null;

function getDb() {
  if (typeof window === 'undefined') return null;

  if (!dbPromise) {
    dbPromise = openDB(DB_NAME, 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, { keyPath: 'id' });
        }
      },
    });
  }

  return dbPromise;
}

export async function getAllContacts(): Promise<Contact[]> {
  const db = getDb();
  if (!db) return [];
  return (await db).getAll(STORE_NAME);
}

export async function saveContact(contact: Contact): Promise<void> {
  const db = getDb();
  if (!db) return;
  await (await db).put(STORE_NAME, contact); 
}


export async function deleteContact(id: string): Promise<void> {
  const db = getDb();
  if (!db) return;
  return (await db).delete(STORE_NAME, id);
}
