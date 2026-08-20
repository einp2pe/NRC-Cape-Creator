const DB_NAME = "nrc-cape-creator";
const DB_VERSION = 1;
const STORE = "images";
const KEY = "sources";

export type StoredImages = Record<string, string>;

const asError = (cause: DOMException | null) =>
  cause ?? new Error("IndexedDB request failed");

function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      if (!request.result.objectStoreNames.contains(STORE)) {
        request.result.createObjectStore(STORE);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(asError(request.error));
  });
}

async function withStore<T>(
  mode: IDBTransactionMode,
  run: (store: IDBObjectStore) => IDBRequest
): Promise<T> {
  const db = await openDatabase();

  try {
    return await new Promise<T>((resolve, reject) => {
      const request = run(db.transaction(STORE, mode).objectStore(STORE));
      request.onsuccess = () => resolve(request.result as T);
      request.onerror = () => reject(asError(request.error));
    });
  } finally {
    db.close();
  }
}

export async function readStoredImages(): Promise<StoredImages> {
  try {
    return (
      (await withStore<StoredImages | undefined>("readonly", (store) =>
        store.get(KEY)
      )) ?? {}
    );
  } catch {
    return {};
  }
}

export async function writeStoredImages(images: StoredImages): Promise<void> {
  try {
    await withStore("readwrite", (store) => store.put(images, KEY));
  } catch {}
}

export async function clearStoredImages(): Promise<void> {
  try {
    await withStore("readwrite", (store) => store.delete(KEY));
  } catch {}
}
