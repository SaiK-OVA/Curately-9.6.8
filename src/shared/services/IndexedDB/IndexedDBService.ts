import { userLocalData } from "../userData";

const DBData = {
    dbName: "Curately",
    version: 1,
    storeName: `Curately_${userLocalData.getvalue("clientId")}_${userLocalData.getvalue("clientName")}`
}

class IndexedDBClass {
    private dbName: string;
    private dbVersion: number;
    private storeName: string;
    private db: IDBDatabase | null = null;

    constructor() {
        this.dbName = DBData.dbName;
        this.dbVersion = DBData.version;
        this.storeName = DBData?.storeName ? DBData.storeName : `Curately_${userLocalData.getvalue("clientId")}_${userLocalData.getvalue("clientName")}`
    }

    private InitializeDB = async () => {
        try {
            if (typeof window !== undefined && 'indexedDB' in window && window?.indexedDB?.open as any) {
                if (this.db) {
                    return this.db
                }

                const request = indexedDB.open(this.dbName, this.dbVersion);

                request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
                    const db = (event.target as IDBRequest).result as IDBDatabase;
                    if (!db.objectStoreNames.contains(this.storeName)) {
                        db.createObjectStore(this.storeName);
                    }
                }

                this.db = await new Promise<IDBDatabase>((resolve, reject) => {
                    request.onsuccess = (event: Event) => resolve((event.target as IDBRequest).result);
                    request.onerror = (event: Event) => reject((event.target as IDBRequest).error);
                });

                return this.db;

            } else {
                console.error("Indexed DB is not supported to your browser")
                return null;
            }
        } catch (error: any) {
            console.error("IndexDB is not initializing", error);
            return null;
        }
    }

    GetDBData = async (key: string,): Promise<any> => {
        try {
            const db = await this.InitializeDB();
            return new Promise<any | undefined>((resolve, reject) => {
                const transaction = db?.transaction(this.storeName, 'readonly');
                const store = transaction?.objectStore(this.storeName);
                const request: any = store?.get(key);
                request.onsuccess = (event: Event) => resolve((event.target as IDBRequest).result);
                request.onerror = (event: Event) => reject((event.target as IDBRequest).error);
            });
        } catch (error) {
            console.error("Error in getting data from IndexedDB", error);
            return null;
        }
    }

    InsertDBData = async (key: string, data: any): Promise<IDBValidKey | null> => {
        try {
            const db = await this.InitializeDB();
            return new Promise<IDBValidKey>((resolve, reject) => {
                const transaction = db?.transaction(this.storeName, "readwrite");
                const store = transaction?.objectStore(this.storeName);
                const request: any = store?.put(data, key)
                request.onsuccess = (event: Event) => resolve((event.target as IDBRequest).result);
                request.onerror = (event: Event) => reject((event.target as IDBRequest).error);
            })
        } catch (error) {
            console.error("Error in inserting data in IndexedDB", error);
            return null;
        }
    }
}

const IndexedDBService = new IndexedDBClass();
export default IndexedDBService;