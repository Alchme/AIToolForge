
import type { Conversation, StaticTool } from '../types';

// The icon property on StaticTool is a React component and cannot be stored in IndexedDB.
// We'll use this utility type to represent the storable version of the tool.
type StorableStaticTool = Omit<StaticTool, 'icon'>;

const DB_NAME = 'ToolFORGEDB';
const DB_VERSION = 1;
const STORES = {
    CONVERSATIONS: 'conversations',
    USER_TOOLS: 'userTools',
    APP_STATE: 'appState',
};

let dbPromise: Promise<IDBDatabase> | null = null;

const initDB = (): Promise<IDBDatabase> => {
    if (dbPromise) {
        return dbPromise;
    }

    dbPromise = new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onerror = () => {
            console.error('IndexedDB error:', request.error);
            reject('Error opening database');
        };

        request.onsuccess = () => {
            resolve(request.result);
        };

        request.onupgradeneeded = () => {
            const db = request.result;
            if (!db.objectStoreNames.contains(STORES.CONVERSATIONS)) {
                db.createObjectStore(STORES.CONVERSATIONS, { keyPath: 'id' });
            }
            if (!db.objectStoreNames.contains(STORES.USER_TOOLS)) {
                db.createObjectStore(STORES.USER_TOOLS, { keyPath: 'id' });
            }
            if (!db.objectStoreNames.contains(STORES.APP_STATE)) {
                db.createObjectStore(STORES.APP_STATE, { keyPath: 'key' });
            }
        };
    });

    return dbPromise;
};

const promisifyRequest = <T>(request: IDBRequest<T>): Promise<T> => {
    return new Promise((resolve, reject) => {
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
};

const promisifyTransaction = (tx: IDBTransaction): Promise<void> => {
    return new Promise((resolve, reject) => {
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
    });
};


const getStore = async (storeName: string, mode: IDBTransactionMode) => {
    const db = await initDB();
    return db.transaction(storeName, mode).objectStore(storeName);
};

export const getConversations = async (): Promise<Conversation[]> => {
    const store = await getStore(STORES.CONVERSATIONS, 'readonly');
    const conversations = await promisifyRequest(store.getAll());
    // Sort by the timestamp of the last message in each conversation
    return conversations.sort((a, b) => {
        const lastMsgA = a.messages[a.messages.length - 1]?.timestamp || a.id.split('-').pop();
        const lastMsgB = b.messages[b.messages.length - 1]?.timestamp || b.id.split('-').pop();
        return Number(lastMsgB) - Number(lastMsgA);
    });
};

export const saveConversation = async (conversation: Conversation): Promise<void> => {
    const store = await getStore(STORES.CONVERSATIONS, 'readwrite');
    await promisifyRequest(store.put(conversation));
};

export const deleteConversation = async (id: string): Promise<void> => {
    const store = await getStore(STORES.CONVERSATIONS, 'readwrite');
    await promisifyRequest(store.delete(id));
};

export const getUserTools = async (): Promise<StorableStaticTool[]> => {
    const store = await getStore(STORES.USER_TOOLS, 'readonly');
    return promisifyRequest(store.getAll());
};

export const saveUserTool = async (tool: StorableStaticTool): Promise<void> => {
    const store = await getStore(STORES.USER_TOOLS, 'readwrite');
    await promisifyRequest(store.put(tool));
};

export const deleteUserTool = async (id: string): Promise<void> => {
    const store = await getStore(STORES.USER_TOOLS, 'readwrite');
    await promisifyRequest(store.delete(id));
};

export const getAppState = async <T>(key: string): Promise<T | null> => {
    const store = await getStore(STORES.APP_STATE, 'readonly');
    const result = await promisifyRequest(store.get(key));
    return result ? result.value : null;
};

export const saveAppState = async (key: string, value: any): Promise<void> => {
    const store = await getStore(STORES.APP_STATE, 'readwrite');
    await promisifyRequest(store.put({ key, value }));
};

export const clearAllConversations = async (): Promise<void> => {
    const store = await getStore(STORES.CONVERSATIONS, 'readwrite');
    await promisifyRequest(store.clear());
};

export const clearAllUserTools = async (): Promise<void> => {
    const store = await getStore(STORES.USER_TOOLS, 'readwrite');
    await promisifyRequest(store.clear());
};

export const clearAllData = async (): Promise<void> => {
    const db = await initDB();
    const transaction = db.transaction(Object.values(STORES), 'readwrite');
    for (const storeName of Object.values(STORES)) {
        transaction.objectStore(storeName).clear();
    }
    await promisifyTransaction(transaction);
};
